// importing d3 modules
import {select} from "d3-selection";
import {transition} from "d3-transition";
import {dispatch} from "d3-dispatch";

// importing util functions
import {partyDict} from "../utils/utils";

function Squares(_) {

    let _margin = {t:0, r:0, b:0, l:0};
    let _spacing = 1;
    let _rowLength = 14;
    let _nodeSize;
    let _n;

    const dispatcher = dispatch('tooltip:toggle','tooltip:untoggle','node:enter','node:leave');

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

        // calculating node size according to configs
        const nodeSize = ((w - ((_rowLength-2) * _spacing)) / _rowLength)-0.5;
        _nodeSize = nodeSize;
        _n = data.length;

        // sorting data, happens in place
        data.sort((a,b) => a.party.localeCompare(b.party));

        // let nodeLinkUpdate = container.selectAll('.d3-node-link')
        //     .data(data);
        // const nodeLinkEnter = nodeLinkUpdate.enter()
        //     .append('a')
        //     .classed('d3-node-link',true);
        // nodeLinkUpdate.exit().remove();
        // nodeLinkUpdate = nodeLinkUpdate.merge(nodeLinkEnter)
        //     .attr('href', d => `/candidate?candidate_id=${d.slug}`);

        let nodeUpdate = container.selectAll('.d3-node')
            .data(data);
        const nodeEnter = nodeUpdate.enter()
            .append('div')
            .classed('d3-node',true);
        nodeUpdate.exit().remove();
        nodeUpdate = nodeUpdate.merge(nodeEnter)
            .style('background-color',d => partyDict[d.party])
            .style('opacity',1)
            .on('mouseenter', function(d,i) {
                dispatcher.call('node:enter',this,d,i);
                dispatcher.call('tooltip:toggle',this,d);
            })
            .on('mouseleave', function(d) {
                dispatcher.call('node:leave',this,null);
                dispatcher.call('tooltip:untoggle',this,d);
            })
            .transition()
            .duration(100)
            .style('width',`${nodeSize}px`)
            .style('height',`${nodeSize}px`)
            .style('left', (d,i) => `${i}px`)
            .style('margin-bottom',`${_spacing}px`);

        nodeUpdate.filter((d,i) => i % _rowLength !== _rowLength-1)
            .style('margin-right',`${_spacing}px`);

    }

    exports.margin =  function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _margin;
        _margin = _;
        return this;
    };

    exports.spacing =  function(_) {
        // _ expects an integer
        if (_ === 'undefined') return _spacing;
        _spacing = _;
        return this;
    };

    exports.rowLength =  function(_) {
        // _ expects an integer
        if (_ === 'undefined') return _rowLength;
        _rowLength = _;
        return this;
    };

    exports.getHeight = function() {
        const n = Math.ceil(_n / _rowLength);
        return n * _nodeSize + (n - 2) * _spacing;
    };

    exports.on = function(event,cb) {
        // event is a string. represents custom-created event
        // cb is a callback function.
        dispatcher.on(event,cb);
        return this;
    };

    return exports;
};

export default Squares;
