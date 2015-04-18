//Slider tool, allows user to sleect size of drawing line
$(function() {
  var sliderSize;
  var aFontsSizeArray = new Array('5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '24', '26', '28', '30', '33', '36', '39', '42', '45', '48', '55', '65', '75');
  $('#slider').slider({
    value: 7, //slider defaul size (12)
    min: 0,   //slider minimum size
    max: 30,  //slider maximum size
    step: 1,  //change size by 1 on slider
    slide: function(event, ui) {
      var sFontSizeArray = aFontsSizeArray[ui.value];
      $('#size').val(sFontSizeArray + ' px');
      $('.textBox').css('size', sFontSizeArray + 'px' );
      sliderSize = Meteor.tools.getSize();
    }
  });
  $('#size').val((aFontsSizeArray[$('#slider').slider('value')]) + ' px');
  return sliderSize;
});
