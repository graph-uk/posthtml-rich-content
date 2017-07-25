# PostHTML Rich Content

A set of PostHTML plugins to transform rich content.

## Getting started 

The plugin allows to make the following content transformations:

### Video block

Wrap `<iframe>` with `<div>` to make to proportional

##### Given:
```html
<iframe src="" />
```
    
##### Output:
```html
<div class="<my-block-class>__video">
    <iframe class="<my-block-class>__video-frame" src="" />
</div>
```

##### Usage:
``` javascript
import replaceVideo from 'posthtml-rich-content/replaceVideo';
import block from 'bem-cn-lite';

const b = block('<my-block-class>');

replaceVideo(b);
```

### Element with caption
Wrap element with caption into `<figure>`

##### Given:
```html
    <p><img src="..."/></p>
    <p><em>Image Caption</em><p>
```

or

```html
    <p><em><img src="..."/></em></p>
    <p><em>Image Caption</em><p>
```
    
##### Output:
```html
<figure class="<my-block-class>__figure <my-block-class>__figure_type_picture">
    <img class="<my-block-class>__figure-content <my-block-class>__figure_type_picture">
    <figcation class="<my-block-class>__figure-caption <my-block-class>__figure_type_picture">Image Caption</figcaption>
</figure>
```

##### Usage:
``` javascript
import convertToFigure from 'posthtml-rich-content/convertToFigure';
import block from 'bem-cn-lite';

const b = block('<my-block-class>');

convertToFigure(b, 'img');
convertToFigure(b, 'blockquote');
```

### Markup filter

 Add "markup" class to each tag
 
##### Given:
```html
<div>
    <p><img class="picture" src=""/></p>
    <ul>
        <li>Lorem ipsum</li>
    </ul>
</div>
```
     
 ##### Output:
 ```html
<div class="<my-block-class>__markup-div">
    <p class="<my-block-class>__markup-p"><img src="" class="<my-block-class>__markup-img picture"/></p>
    <ul class="<my-block-class>__markup-ul">
        <li class="<my-block-class>__markup-li">Lorem ipsum</li>
    </ul>
</div>
 ```
 
 ##### Usage:
 ``` javascript
 import replaceVideo from 'posthtml-rich-content/replaceVideo';
 import block from 'bem-cn-lite';
 
 const b = block('<my-block-class>');
 
 filterMarkup(b);
 ```


## Usage with posthtml

The function is written as a plugin to posthtml. It performs a transformation of document tree that posthtml provides. As such, a complete usage example shows how to apply this function to a series of posthtml transformations.

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

	return function (html) {
		  return processor.process(html, {sync: true}).html;
	};
}
```
