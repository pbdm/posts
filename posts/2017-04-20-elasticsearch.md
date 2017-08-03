# elasticsearch

* elasticsearch version: 2.3.2

## elasticsearch.js

* 启动的时候需要设置匹配的 apiVersion
* js 版本和服务端版本不相关， 只需用最新的并且设置好正确的 apiVersion 就可向下兼容
* v2.3 里，searchType 为 `count` 可以不返回除 aggs 以外的数据， 从而减少数据量

## cluser

### node

* document
* index/type(collection fo documents)
* share(subdivide of index for performance)

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
