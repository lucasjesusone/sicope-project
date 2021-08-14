declare let $: any;

export class Helpers {
	static setLoading(loading) {
		let body = $('body');
		if (loading) {
			$('.preloader-backdrop').fadeIn(200);
		} else {
			$('.preloader-backdrop').fadeOut(200);
		}
	}

	static bodyClass(Class) {
		$('body').attr('class', Class);
	}

	static initLayout() {
		$(".metismenu").metisMenu();
		$('.js-sidebar-toggler').click(function () {
			$('body').toggleClass('sidebar-mini');
		});
	}

	static initPage() {
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();
		$('.scroller').each(function () {
			$(this).slimScroll({
				height: $(this).attr('data-height'),
				color: $(this).attr('data-color'),
				railOpacity: '0.9',
			});
		});
		$('.slimScrollBar').hide();
		$('.ibox-collapse').click(function () {
			var ibox = $(this).closest('div.ibox');
			ibox.toggleClass('collapsed-mode').children('.ibox-body').slideToggle(200);
		});
		$('.ibox-remove').click(function () {
			$(this).closest('div.ibox').remove();
		});
		$('.fullscreen-link').click(function () {
			if ($('body').hasClass('fullscreen-mode')) {
				$('body').removeClass('fullscreen-mode');
				$(this).closest('div.ibox').removeClass('ibox-fullscreen');
				$(window).off('keydown', toggleFullscreen);
			} else {
				$('body').addClass('fullscreen-mode');
				$(this).closest('div.ibox').addClass('ibox-fullscreen');
				$(window).on('keydown', toggleFullscreen);
			}
		});
		function toggleFullscreen(e) {
			if (e.which == 27) {
				$('body').removeClass('fullscreen-mode');
				$('.ibox-fullscreen').removeClass('ibox-fullscreen');
				$(window).off('keydown', toggleFullscreen);
			}
		}
	}
}