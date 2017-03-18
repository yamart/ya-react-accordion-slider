import * as React from 'react';

export interface AccordionSliderDataModel{
    img:string;
    head?:string;
}

export interface AccordionSliderProps{
    visible:boolean;
    className?:string;
    data:Array<AccordionSliderDataModel>;
    responsive:boolean; 
    orientation?:'vertical'|'horizontal';
    resize?:number;
    onItemClick?:()=>void;
}

export interface AccordionSliderState{
    orientation?:string;
    resize?:number;
}

export class AccordionSlider extends React.Component<AccordionSliderProps,AccordionSliderState>{
    bb:any;
    panels:any;
    panelsCount:number;
    panelsSpacing:any;
    isVertical:boolean;

    constructor(props:AccordionSliderProps){
        super(props); 
        this.state = {
            orientation: props.orientation
        }
        
        this.panelsSpacing = {
            default: 0,
            expanded: 0,
            shrank: 0
        }

        this.setSpacing = this.setSpacing.bind(this);
        this.expandPanel = this.expandPanel.bind(this);
        this.calculate = this.calculate.bind(this);
        this.onResize = this.onResize.bind(this); 
		this.onResize = _.throttle(this.onResize,500); 
    }
    
    componentDidMount() {
        this.panels = (this.refs['panels'] as HTMLElement).querySelectorAll('.as-panel'); 
        this.bb = (this.refs['accordion-slider'] as HTMLElement);
        this.panelsCount = this.props.data.length;
        this.isVertical = this.state.orientation == 'vertical';
        window.addEventListener('resize',this.onResize);        
        
        setTimeout(() => {
            this.onResize();
        }, 500);
    }

    componentDidUpdate() {
        this.isVertical = this.state.orientation == 'vertical';

        if(this.props.resize != this.state.resize) {
            this.setState({
                resize: this.props.resize
            });

            setTimeout(() => {
                this.onResize();
            }, 200);            
        }
    }

    onResize() {    
        if(this.props.responsive) {
            let bb = this.bb.getBoundingClientRect();
            this.setState({
                orientation: bb.width < 450 ? 'vertical' : 'horizontal',
            });
        }

        this.calculate();
        this.setSpacing();
    }

    calculate() {
        let bb = this.bb.getBoundingClientRect(),
            imgEl = this.panels[0].querySelector('.as-panel-image img'),
            imgWidth = imgEl.clientWidth/bb.width*100,
            imgHeight = imgEl.clientHeight/bb.height*100;

        this.panelsSpacing = {
            default: 100/this.panelsCount,
            expanded: this.isVertical ? imgHeight : imgWidth,
            shrank: (100 - (this.isVertical ? imgHeight : imgWidth)) / (this.panelsCount-1)
        }
    }

    setSpacing() {
        for(let i = 0; i < this.panels.length; i++) {
            this.panels[i].setAttribute('expanded',false);
            this.panels[i].style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.default+'%';
            this.panels[i].style[!this.isVertical ? 'height' : 'width'] = '';            
        }
    }

    expandPanel(e:any) {
        let bb = this.bb.getBoundingClientRect(),
            el = (e.currentTarget as HTMLElement),
            index = el.getAttribute('data-index');

        el.setAttribute('expanded','true');
        el.style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.expanded+'%';

        for(let i = 0; i < this.panels.length; i++) {
            if(i+"" != index) {
                this.panels[i].style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.shrank+'%';
                this.panels[i].style[!this.isVertical ? 'height' : 'width'] = '';
            }            
        }
    }

    render(){
        let clz = this.props.className || '',
            props = this.props;
        
        return (
            <div ref="accordion-slider" 
                 className={"accordion-slider " +clz}
                 data-visible={this.props.visible}
                 data-orientation={this.state.orientation}>

                <div className="as-holder">
                    <div className="as-panels" ref="panels">
                    {
                        this.props.data.map((d:any, i:number) => {
                            return (
                                <div className="as-panel" 
                                     key={i} 
                                     data-index={i} 
                                     onMouseOver={this.expandPanel} 
                                     onMouseOut={this.setSpacing}
                                     onClick={props.onItemClick}>

                                    { d.head &&
                                        <div className="as-panel-head">
                                            <div className="as-head-inner"><h1>{ d.head }</h1></div>
                                        </div>
                                    }
                                    
                                    <div className="as-panel-image">
                                        <img src={ d.img } />
                                    </div>

                                </div>
                            )
                        })
                    }
                    </div>
                </div>

            </div>
        );
    }
}