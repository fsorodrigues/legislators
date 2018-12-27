// importing d3 modules
import {select} from 'd3-selection';

// importing accessory functions
import {chamberDict} from '../utils/utils';

// importing stylesheets
import '../style/typography.css';

function Tooltip() {

    //
    let _mouse = {left:0,top:0};
    let _parentDimensions = {width:200,height:500};

    function exports(data) {
        console.log(_parentDimensions);

        // access to root elements
        const root = this;
        const container = select(this);
        const containerWidth = root.clientWidth;

        // appending text to tooltip
        let nameTootipUpdate = container.selectAll('.d3-name-tooltip')
            .data([data]);
        const nameTootipEnter = nameTootipUpdate.enter()
            .append('h4')
            .classed('d3-name-tooltip',true);
        nameTootipUpdate.exit().remove();
        nameTootipUpdate = nameTootipUpdate.merge(nameTootipEnter)
            .html(d => {
                return `${d.candidate_name} <span class='party ${d.party.toLowerCase()}'>${d.party[0]}</span>`;
            });

        let locTootipUpdate = container.selectAll('.d3-loc-tooltip')
            .data([data]);
        const locTootipEnter = locTootipUpdate.enter()
            .append('p')
            .classed('d3-loc-tooltip',true);
        locTootipUpdate.exit().remove();
        locTootipUpdate = locTootipUpdate.merge(locTootipEnter)
            .text(d => `${chamberDict[d.chamber]} ${d.district}`);

        // handling positions
        // horizontal position
        if (_mouse.left > _parentDimensions.width/2) {
            console.log(_mouse.left)
            container.style('left',``)
                .style('right', `${_parentDimensions.width - _mouse.left}px`);
        } else {
            container.style('left',`${_mouse.left}px`)
                .style('right', ``);

        }

        if (_mouse.top > 3*_parentDimensions.height/4) {
            console.log("here");
            container.style('top',`${_mouse.top}px`)
                .style('bottom', ``);

        } else {
            container.style('top',`${_mouse.top}px`)
                .style('bottom', ``);
        }




    }

    exports.mouse = function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _mouse;
        [_mouse.left,_mouse.top] = _;
        return this;
    };

    exports.parentDimensions = function(_) {
        if (_ === 'undefined') return _parentDimensions;
        [_parentDimensions.width,_parentDimensions.height] = _;
        return this;
    };

    return exports;
}

export default Tooltip;
