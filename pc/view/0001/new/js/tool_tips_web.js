/**
*	弹出框
**/
$.fn.tool_tips=function(obj, options){
	var $t = this;
	var $this = $(obj);
	options = $.extend({
		toolClass: '',
		locate: '',
		hoverHide: false,
		top: 10,
		forceTop: false
	}, options);
	var tid = (options.close) ? 'park': '',
		bindEvent = (options.close) ? 'click': 'mouseover',
		sel = '#tool_tips' + tid,
		closeSel = sel + ' .close',
		arrowSel = sel + ' .arrow';

	$this.each(function(){
		$this.bind(bindEvent,
		function(){
			if($(sel).size() == 0){
				$('body').prepend('<div id="tool_tips' + tid + '" class="tool_tips ' + options.toolClass + '"><span class="close"></span><span class="arrow"></span><div></div></div>');
				$(closeSel).click(function(){
					$(sel).hide();
				})
			}
			if(!options.close){
				$(closeSel).hide();
				if(options.hoverHide){
					$(options.hoverObj).hover(function(){},function(){
						$(sel).hide();
					});

					$(sel).hover(function(){
						$this.show();
					},function(){
						$this.hide();
					});
				}else{
					$this.mouseout(function(){
						$(sel).hide();
					});
				}
            }
            $(sel + ' div').html(options.html);
			$(sel).css({top:-9999, width:options.width}).show().width($(sel).width() + 2);
			function findTotalOffset(obj){
				var ol = ot = 0;
				if(obj.offsetParent){
					do{
						ol += obj.offsetLeft;
						ot += obj.offsetTop;
					}while( obj = obj . offsetParent )
                }
                return {left:ol, top:ot}
            }
            var offset = findTotalOffset(this),
				width = $this.width() + parseInt($this.css("padding-left")) + parseInt($this.css("padding-right")),
				height = $this.height() + parseInt($this.css("padding-top")) + parseInt($this.css("padding-bottom")),
				correctLeft = '',
				attowRight = '';
			if(options.locate === 'center'){
				correctLeft = offset.left + width / 2 - $(sel).outerWidth() / 2;
			}else{
				correctLeft = offset.left;
				attowRight = 26;
			}
			switch(options.position){
			case 'vertical':
				if(options.locate === 'center'){
					$(sel).css({
						left: correctLeft
					});
					$(arrowSel).css({
						left: $(sel).outerWidth() / 2 - 9
					});
				}else if(offset.left < $(window).width() / 2){
					if (width >= 30) $(sel).css({
						left: correctLeft
					});
					else $(sel).css({
						left: correctLeft - 28 + width / 2
					});
					$(arrowSel).css({
						left: 18
					});
				}else{
					if(width >= 30) $(sel).css({
						left: correctLeft + width - $(sel).outerWidth()
					});
					else $(sel).css({
						left: correctLeft + width - $(sel).outerWidth() + 35 - width / 2
					});
					$(arrowSel).css({
						left: 'auto',
						right: attowRight
					});
                }
                if((offset.top + height + $(sel).height() + 52 - $(window).scrollTop() <= $(window).height() || offset.top - $(sel).height() - 52 < $(window).scrollTop()) && !options.forceTop){
					$(sel).css({
						top: offset.top + height + options.top + 5
					});
					$(arrowSel).css({
						top: -9,
						backgroundPosition: '-96px -12px'
					});
				}else{
					$(sel).css({
						top: offset.top - $(sel).outerHeight() - $(arrowSel).outerHeight(true)
					});
					$(arrowSel).css({
						top: 'auto',
						bottom: -16,
						backgroundPosition: '-65px -12px'
					});
                }
                break;
			case 'horizontal':
				offset.left = $this.offset().left;
				offset.top = $this.offset().top;
				if(offset.left < $t.width() / 2){
					$(sel).css({
						left: offset.left + width + 15
					});
					$(arrowSel).css({
						left: -7,
						backgroundPosition: '-34px -4px'
					});
				}else{
					$(sel).css({
						left: offset.left - options.width - 47
					});
					$(arrowSel).css({
						left: 'auto',
						right: -12,
						width: 12,
						backgroundPosition: '-3px -4px'
					});
                }
                if(offset.top + height + $(sel).height() + 47 - $t.scrollTop() <= $t.height() || offset.top - $(sel).height() - 52 < $t.scrollTop()){
					$(sel).css({
						top: offset.top + 25
					});
					$(arrowSel).css({
						top: 25
					});
				}else{
					$(sel).css({
						top: offset.top - $(sel).height() - 7
					});
					$(arrowSel).css({
						top: 'auto',
						bottom: 15
					});
                }
                break
            }
            return false
		})
	})
};
