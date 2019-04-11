# JSON Schema

* [官方网站](https://json-schema.org/)
  * [Learn JSON Schema](https://json-schema.org/learn/)
  * [list of JSON Schema software](https://json-schema.org/implementations.html)
* [从现有 json 推算 schema](https://www.jsonschema.net/)
* [JSON Schama Store](http://schemastore.org/json/)

> [JSON Schemas & Settings in VS Code doc](https://code.visualstudio.com/docs/languages/json#_json-schemas-settings)
>
> [Json Schema with VS Code](https://omkarmore.wordpress.com/2017/04/07/json-schema/)
>
> [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

## Validator

* [online validator](https://www.jsonschemavalidator.net/)
* [AJV: JSON Schema Validator](https://github.com/epoberezkin/ajv)

## Keywords

* Schema Keyword
  * [$schema](http://json-schema.org/latest/json-schema-core.html#rfc.section.7): 标准的链接
  * [$id](http://json-schema.org/latest/json-schema-core.html#rfc.section.8.2): schema 的 URI
* [Schema Annotations](http://json-schema.org/latest/json-schema-validation.html#rfc.section.10):
  * `title` 和 `description`: schema 的一些描述性信息, 对 data 是否 validate 不造成影响
  * `default`
  * `readOnly` 和 `writeOnly`
  * `examples`
* [Validation Keyword](http://json-schema.org/latest/json-schema-validation.html#rfc.section.6):
  * for Any Instance Type
    * type
  * for Objects
    * properties: 定义 object 子元素
    * required: 一个数组, 包含所有必要的字段
  * for Arrays
    * items: 定义 array 子元素
* [$ref](http://json-schema.org/latest/json-schema-validation.html#rfc.section.9): 可以引用其他 schema 来定义当前 schama 的某个字段

> [ref extending](https://json-schema.org/understanding-json-schema/structuring.html#extending)
>
> [貌似继承时 additionalProperties 不好用](https://stackoverflow.com/questions/22689900/json-schema-allof-with-additionalproperties/24365393#24365393)

## editor

* [json-editor/json-editor](https://github.com/json-editor/json-editor)
* [josdejong/jsoneditor](https://github.com/josdejong/jsoneditor)
