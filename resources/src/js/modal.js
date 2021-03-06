/**
 * modal
 */
var modal = (function(window, document, $) {
    var $modal = $('<div class="modal"></div>');
    var $modalMask = $('<div class="modal-mask"></div>');
    var $modalBox = $('<div class="modal-box"></div>');
    var $modalHead = $('<div class="modal-head"></div>');
    var $modalBody = $('<div data-sadari="result" class="modal-body"></div>');
    var $modalClose = $(
        '<button class="modal-close" type="button"><i class="fa fa-times" aria-hidden="true"></i></div>'
    );
    var optionNumber =
        '<div class="option root">' +
        '<button data-sadari="send-slack" type="button" class="option item"><i class="fa fa-slack" aria-hidden="true"></i> slack</button>' +
        '<label class="option item">' +
        '<input type="checkbox" data-option="number">' +
        ' 번호 표시 </label>' +
        '</div>';

    $modal.append($modalMask, $modalBox);
    $modalBox.append($modalHead, $modalBody, $modalClose);

    function open(content, title) {
        title = title || '결과';
        $modalHead.empty().append(title, $(optionNumber));
        $modalBody.empty().append(content);
        $modal.appendTo(sd.JQ.BODY);
    }

    function close() {
        if (confirm('결과창을 닫으시겠습니까?')) {
            $modal.attr('data-option', '').remove();
        }
    }

    function _handleKeyup(e) {
        if (sd.JQ.DOC.find('.modal').length && e.which == 27) {
            close();
        }
    }

    // sd.JQ.DOC.on('click', '.modal-mask, .modal-close', close).on(
    //     'keyup',
    //     _handleKeyup
    // );

    return {
        open: open,
        close: close
    };
})(window, document, jQuery);
