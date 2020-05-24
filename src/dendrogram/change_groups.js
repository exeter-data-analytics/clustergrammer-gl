var calc_dendro_triangles = require('./../dendrogram/calc_dendro_triangles');
var make_dendro_args = require('./../dendrogram/make_dendro_args');
var slice_linkage = require('./slice_linkage');
var d3 = require("d3");

/* Changes the groupings (x- and y-axis color bars).
 */
module.exports = function change_groups(cgm, axis, slider_value) {

  let regl = cgm.regl
  let params = cgm.params

  params.dendro.update_dendro = true;

  // console.log('dendro group level in calc_dendro_triangles')
  // console.log(slider_value)

  if (params.dendro.precalc_linkage){
    let dist_thresh = params.dendro.max_linkage_dist[axis] * slider_value
    slice_linkage(params, axis, dist_thresh)

    let rounded_slider_value = Math.round(slider_value * 100 )/100
    // update slider
    d3.select(params.root + ' .'+ axis +'_dendro_slider_svg .dendro_level_text')
      .text(rounded_slider_value)

  } else {
      params.dendro.group_level[axis] = slider_value;
  }

  params.dendro.group_info[axis] = calc_dendro_triangles(params, axis);
  params.dendro.dendro_args[axis] = make_dendro_args(regl, params, axis);

};
