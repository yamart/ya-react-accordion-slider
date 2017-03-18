declare module "ya-react-accordion-slider" {
    import {Component} from 'react'; 
    
    export interface AccordionSliderDataModel{
        img:string;
        head?:any;
    }

    export interface AccordionSliderProps{
        visible:boolean;
        className?:string;
        data:Array<AccordionSliderDataModel>;
        responsive?:boolean; 
        orientation?:'vertical'|'horizontal';
        resize?:number;
        onItemClick?:()=>void;
    }

    export interface AccordionSliderState{
        orientation?:string;
        resize?:number;
    }

    export class AccordionSlider extends Component<AccordionSliderProps,AccordionSliderState>{

    }
}