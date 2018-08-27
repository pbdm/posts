# elasticsearch

* 刚接触时使用的版本: 2.3.2

## elasticsearch.js

* 启动的时候需要设置匹配的 apiVersion
* js 版本和服务端版本不相关， 只需用最新的并且设置好正确的 apiVersion 就可向下兼容
* v2.3 里，searchType 为 `count` 可以不返回除 aggs 以外的数据， 从而减少数据量
* [Starting from Elasticsearch 6.0, all REST requests that include a body must also provide the correct content-type for that body](https://www.elastic.co/blog/strict-content-type-checking-for-elasticsearch-rest-requests)
* [这里](https://github.com/elastic/elasticsearch-js/blob/f493527dc4c540c2835292badcdc1d5bdf25a187/src/lib/apis/browser_index.js)可以直接看到当前版本在浏览器环境支持哪些 api
  * [这个版本](https://github.com/elastic/elasticsearch-js/commit/d31490d5b6d53aba4b9c586a070b214ed271d97b#diff-b4028db06837b925e3a60a1a2888133c)删除了 2.4 的支持
* [serach api](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search)

## 基本概念

* cluser: 一组 node(集群)
* node: 单个 Elastic 实例
* index: (collection fo documents), 对应 sql 里的一个库
* type: document 的分组, 将在 7.x 版本后[移除](https://www.elastic.co/blog/index-type-parent-child-join-now-future-in-elasticsearch)这个概念
* document: index 里面的单条记录， 对应 sql 里的一行
* shard: 分片(subdivide of index for performance), 可分散在多个 node 上

> [Elasticsearch Reference [5.5]](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/_basic_concepts.html#getting-started-shards-and-replicas)

## dsl

### query

* bool
  * must(与)
  * should(或)
  * filter

### aggs

* avg
* terms
* wildcard
* range
* cardinality
* date_histogram

* extended_bounds(防止数据中断)

## 缓存

* [Request Cache](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/shard-request-cache.html)

> [Elasticsearch: 权威指南](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)
