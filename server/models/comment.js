'use strict';
const elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  httpAuth: `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`,
});

function toComment(instance) {
  return {
    type: instance.type,
    text: instance.text,
    stars: instance.stars,
    title: instance.title,
    commenterId: instance.commenterId,
    restaurantId: instance.restaurantId,
  };
}

module.exports = function(Comment) {
  Comment.observe('after save', function(ctx, next) {
    console.log('after save being run');
    console.log(ctx.instance);
    client.index({
      index: 'comment',
      type: 'comment',
      body: toComment(ctx.instance),
      id: ctx.instance.id.toString(),
    }).then(function(resp) {
      console.log('ok from es', resp);
      next();
    }, function(err) {
      next(err);
    });
  });

  Comment.observe('after delete', function(ctx, next) {
    console.log('after delete being run');
    console.log(ctx.where);
    client.delete({
      index: 'comment',
      type: 'comment',
      id: ctx.where.id,
    }).then(function(resp) {
      next();
    }, function(err) {
      next(err);
    });
  });

  Comment.search = function(text, cb) {
    console.log('passed ' + text);
    client.search({index: 'comment', type: 'comment', q: text}).then(function(resp) {
      console.log(resp.hits);
      cb(null, resp);
    }, function(err) {
      cb(err, []);
    });
  };

  Comment.remoteMethod('search', {
    accepts: {arg: 'text', type: 'string'},
    returns: {arg: 'results', type: 'array'},
    http: {
      verb: 'get',
    },
  });
};
