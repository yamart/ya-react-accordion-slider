# ya-react-accordion-slider

A simple Accordion Slider component for ReactJS application written in TypeScript.

## Usage

### Data Model

```TypeScript
AccordionSliderDataModel {
    img:string;
    head?:string;
}
```


### Webpack/JSPM Applications Usage (TypeScript) 

```TypeScript
import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import {AccordionSlider} from 'ya-react-accordion-slider'; 

let a = ReactDOM.render(
    <AccordionSlider visible={true} 
                     responsive={true} 
                     data={[
                        {img: 'test-data/01.jpg',head: '01'},
                        {img: 'test-data/02.jpg',head: '02'},
                        {img: 'test-data/03.jpg',head: '03'},
                        ...
                    ]} />,
    document.getElementById('container')
); 
```


### Browser Usage 

```html
<link href="path-to/AccordionSlider.css" />
<script src="path-to/AccordionSlider.js"></script>
<script>
    var a = ReactDOM.render(
                React.createElement(
                    yaReact.AccordionSlider,{
                        visible: true,
                        responsive: true,
                        data: [
                            {img: 'test-data/01.jpg',head: '01'},
                            {img: 'test-data/02.jpg',head: '02'},
                            {img: 'test-data/03.jpg',head: '03'},
                            ...
                        ]
                    }
                ),
                document.getElementById('container')
            );
</script>
```


## Options

- `visible`: **Required** Set the visibility property of the component.
- `className`: **Optional** Add a custom class name.
- `data`: **Required** Set the slides data.
- `responsive`: **Required** Specify if the component will change orientation when sceen size changes.
- `orientation`: **Optional** Set the default orientation `vertical` or `horizontal`.
- `resize`: **Optional** Indicate that component should resize.
- `onItemClick`: **Optional** Add an onClick function for each slide.