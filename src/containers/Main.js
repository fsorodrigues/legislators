// importing d3 modules
import {select,mouse} from "d3-selection";

// importing util functions
import {getLength} from "../utils/utils";

// importing CSS
import '../style/main.css';

// importing containers

// importing components
import Controller from '../components/Controller';
import Squares from '../components/Squares';
import Tooltip from '../components/Tooltip';

// instantiating containers
const controller = Controller();
const squares = Squares();
const tooltip = Tooltip();

function Main(_) {

    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;
    let _chamberConfig = [
        {chamber:"House",isMobile:false,rowLength:17},
        {chamber:"House",isMobile:true,rowLength:11},
        {chamber:"Senate",isMobile:false,rowLength:9},
        {chamber:"Senate",isMobile:true,rowLength:5}
    ];
    let _defaultChamber = "House";

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);

        // root element dimensions
        const clientWidth = root.clientWidth;
        const clientHeight = root.clientHeight;
        const margin = _margin;
        const w = clientWidth - (margin.r + margin.l);
        const h = clientHeight - (margin.t + margin.b);

        // getting unique values
        const listChambers = [...new Set(data.map(item => item.chamber))];

        controller.activeBtn(_defaultChamber);
        // appending container for buttons
        let btnUpdate = container.selectAll('.btn-container')
            .data([listChambers]);
        const btnEnter = btnUpdate.enter()
            .append('div')
            .classed('btn-container',true);
        btnUpdate.exit().remove();
        btnUpdate = btnUpdate.merge(btnEnter)
            .each(controller);

        // // DUMMY DATA
        // const dataset = [];
        // for (const i of Array(30).keys()) {
        //     dataset.push(data[1]);
        // }
        // for (const i of Array(150).keys()) {
        //     dataset.push(data[0]);
        // }

        // filtering data by chamber
        const filterData = data.filter(d => d.chamber === _defaultChamber);

        const rowLength = getLength(_chamberConfig,_defaultChamber,_isMobile,"rowLength");

        squares.rowLength(rowLength);

        // appending container for nodes
        let mapUpdate = container.selectAll('.map-container')
            .data([filterData]);
        const mapEnter = mapUpdate.enter()
            .append('div')
            .classed('map-container',true);
        mapUpdate.exit().remove();
        mapUpdate = mapUpdate.merge(mapEnter)
            .each(squares);

        // appending container for tooltip
        let tooltipUpdate = container.selectAll('.tooltip-container')
            .data([1]);
        const tooltipEnter = tooltipUpdate.enter()
            .append('div')
            .classed('tooltip-container',true);
        tooltipUpdate.exit().remove();
        tooltipUpdate = tooltipUpdate.merge(tooltipEnter);

        // EVENT-HANDLING
        // toggle active status for button
        controller.on('btn:clicked',function(d) {
            controller.activeBtn(d);
            btnUpdate.each(controller);
        })
        .on('chart:redraw',function(d) {
            const newData = data.filter(e => e.chamber === d);
            const newLength = getLength(_chamberConfig,d,_isMobile,"rowLength");

            squares.rowLength(newLength);
            mapUpdate.data([newData])
                .each(squares);
        });

        tooltip.parentDimensions([mapUpdate.node().clientWidth,mapUpdate.node().clientHeight]);

        squares.on('node:enter',function(d) {
            // console.log(this);
        })
        .on('tooltip:toggle',function(d) {
            tooltip.mouse(mouse(document.body));
            tooltipUpdate.data([d])
                .each(tooltip);
        });



    }

    // getter-setter functions
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.defaultChamber = function(_) {
        // _ expects a string
        if (_ === 'undefined') return _defaultChamber;
        _defaultChamber = _;
        return this;
    };

    exports.margin = function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _margin;
        _margin = _;
        return this;
    };

    return exports;
};

export default Main;
