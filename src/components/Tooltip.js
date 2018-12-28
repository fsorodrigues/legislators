// importing d3 modules
import {select} from 'd3-selection';

// importing accessory functions
import {chamberDict} from '../utils/utils';

// importing stylesheets
import '../style/typography.css';

function Tooltip() {

    //
    let _mouse = {x:0,y:0};
    let _parentWidth = 200;

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);
        const containerWidth = root.clientWidth;
        const docWidth = document.body.clientWidth;
        const docHeight = document.body.clientHeight;

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

        const containerHeight = root.clientHeight;

        // handling positions
        // horizontal position
        if (_mouse.x > _parentWidth/2) {
            const padd = docWidth - _parentWidth;
            container.style('left',``)
                .style('right', `${padd + (_parentWidth - _mouse.x)}px`);
        } else {
            container.style('left',`${_mouse.x}px`)
                .style('right', ``);
        }

        // vertical position
        if (_mouse.y > docHeight/2) {
            container.style('top',`${_mouse.y - containerHeight}px`);
        } else {
            container.style('top',`${_mouse.y}px`);
        }

    }

    exports.mouse = function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _mouse;
        [_mouse.x,_mouse.y] = _;
        return this;
    };

    exports.parentWidth = function(_) {
        if (_ === 'undefined') return _parentWidth;
        _parentWidth = _;
        return this;
    };

    return exports;
}

export default Tooltip;
