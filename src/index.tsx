import {AccordionSlider} from "./AccordionSlider";

if (window && document){
    (function(yaReact,W,D){
        yaReact.AccordionSlider = AccordionSlider; 
    }((window as any).yaReact = (window as any).yaReact || {},window,document));
}