# PostHTML Rich Content

A set of PostHTML plugins to transform rich content.

* [Video block](#video-block)
* [Element with caption](#element-with-caption)
* [Markup filter](#markup-filter)

They perform a transformation of document tree that PostHTML provides.

``` javascript
import posthtml from 'posthtml';
import filterMarkup from 'posthtml-rich-content/filterMarkup';
import replaceVideo from 'posthtml-rich-content/replaceVideo';
import convertToFigure from 'posthtml-rich-content/convertToFigure';

export default function (b) {
  const processor = posthtml([
    replaceVideo(b),
    convertToFigure(b, 'img'),
    convertToFigure(b, 'blockquote'),
    filterMarkup(b)
  ]);

  return html => processor.process(html, {sync: true}).html;
}
```

Some of the plugins depend on [bem-cn-lite](https://github.com/mistakster/bem-cn-lite) module,
which generates proper class names.  

## Video block

It wraps `<iframe>` with `<div>` to make to proportional container

### Given:
```html
<iframe src="..." />
```
    
### Output:
```html
<div class="my-block__video">
  <iframe class="my-block__video-frame" src="..." />
</div>
```

### Usage:
```javascript
import replaceVideo from 'posthtml-rich-content/replaceVideo';
import block from 'bem-cn-lite';

const b = block('my-block');

replaceVideo(b);
```

## Element with caption

Wrap element with caption into `<figure>`

### Given:
```html
<p><img src="..."/></p>
<p><em>Image Caption</em><p>
```

or

```html
<p><em><img src="..."/></em></p>
<p><em>Image Caption</em><p>
```
    
### Output:
```html
<figure class="my-block__figure my-block__figure_type_picture">
  <img class="my-block__figure-content my-block__figure_type_picture" src="...">
  <figcation class="my-block__figure-caption my-block__figure_type_picture">Image Caption</figcaption>
</figure>
```

### Usage:
```javascript
import convertToFigure from 'posthtml-rich-content/convertToFigure';
import block from 'bem-cn-lite';

const b = block('my-block');

convertToFigure(b, 'img');
convertToFigure(b, 'blockquote');
```

## Markup filter

Add "markup" class to each tag
 
### Given:
```html
<div>
  <p>
    <img src="..." class="picture"/>
  </p>
  <ul>
    <li>Lorem ipsum</li>
  </ul>
</div>
```
     
### Output:
```html
<div class="my-block__markup-div">
  <p class="my-block__markup-p">
    <img src="..." class="my-block__markup-img picture"/>
  </p>
  <ul class="my-block__markup-ul">
    <li class="my-block__markup-li">Lorem ipsum</li>
  </ul>
</div>
 ```
 
### Usage:
``` javascript
import replaceVideo from 'posthtml-rich-content/replaceVideo';
import block from 'bem-cn-lite';
 
const b = block('my-block');
 
filterMarkup(b);
```
