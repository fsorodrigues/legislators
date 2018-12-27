// importing d3 modules
import {select} from "d3-selection";
import {dispatch} from "d3-dispatch";

// importing CSS
import '../style/button.css';

function Controller(_) {

    let _activeBtn = 'House';

    // instantiating dispatch module
    const dispatcher = dispatch('btn:clicked','chart:redraw');

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);

        let btnUpdate = container.selectAll('.d3-btn')
            .data(data);
        const btnEnter = btnUpdate.enter()
            .append('button');
        btnUpdate.exit().remove();
        btnUpdate = btnUpdate.merge(btnEnter)
            .attr('class', d => {
                if (d == _activeBtn) {
                    return 'd3-active';
                }
            })
            .classed('d3-btn',true)
            .text(d => d.toLowerCase())
            .on('click', function(d) {
                dispatcher.call('btn:clicked',this,d);
                dispatcher.call('chart:redraw',this,d);
            });

    }

    exports.on = function(eventType,fn) {
        // eventType is a string
        // fn is callback function
        dispatcher.on(eventType,fn);
		return this;
    };

    exports.activeBtn = function(_) {
        // _ in a string
        if (_ === 'undefined') return _activeBtn;
        _activeBtn = _;
        return this;
    };

    return exports;
};

export default Controller;
