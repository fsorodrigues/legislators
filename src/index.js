// importing d3 modules
import {select} from "d3-selection";
import {csv} from "d3-fetch";

// importing util functions
import {isMobile} from "./utils/utils";

// importing CSS

// importing containers
import Main from './containers/Main';

// instantiating mobile check
const mobile = isMobile();

// instantiating containers
const main = Main();

// loading data
const data = csv('./data/data.csv', d => d);

// calling drawing function
data.then(data => {

    main.isMobile(mobile)
        .defaultChamber('House');

    select('.content')
        .data([data])
        .each(main);
});
