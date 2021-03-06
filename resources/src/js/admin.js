// 관리자페이지 스크립트
$(function() {
    (function() {
        var member_list = document.querySelector('#member_list');

        function valid(message) {
            return function(input) {
                var inp = input;
                var msg = message;
                var value = inp[0].value;

                if (value === '') {
                    alert(msg);
                    inp.focus();
                    return false;
                }

                return true;
            };
        }

        var val = {
            name: valid('이름을 입력해주세요.')
        };

        // 수정
        var edit = (function() {
            // property
            var btnText = {
                complete: '완료',
                edit: '수정'
            };

            function reset(e) {
                $(member_list)
                    .find('tr')
                    .each(function(i, e) {
                        var $tr = $(e);
                        var $name = $tr.find('[data-member=name]');
                        var $team = $tr.find('[data-member=team]');
                        var $teamSelect = $tr.find('#team_list');
                        var $editBtn = $tr.find('[data-member=edit]');

                        var nameText = $name
                            .find('[data-member=edit-input]')
                            .val();
                        var originName = $name.attr('data-origin-name');
                        var teamText = $team.text();
                        var originTeam = $team.attr('data-origin-team');

                        $name.text(originName || nameText);
                        $team.text(teamText);
                        if ($teamSelect.length) {
                            teamText = originTeam || teamText;
                            $team.text(teamText);
                        }
                        $editBtn.text(btnText.edit);
                        $tr.attr('data-is-edit', 'false');
                    });
            }

            function update(obj) {
                var api = '/admin/member/update';
                var param = obj;

                return $.post(api, param).done(function(response) {
                    console.log(response);
                    // alert('수정완료');
                });
            }

            return function(e) {
                var $self = $(e.currentTarget);
                var $tr = $self.parents('tr');
                var $name = $tr.find('[data-member=name]');
                var $team = $tr.find('[data-member=team]');
                var is_edit = $tr.attr('data-is-edit');

                var originName = $tr.find('[data-member=name]').text();
                var originTeam = $team.text();

                if (is_edit === 'false') {
                    reset();

                    // 이름
                    var $nameInput = $('<input data-member="edit-input" />');
                    var nameText = $name.text();
                    $name
                        .attr('data-origin-name', originName)
                        .html($nameInput.val(nameText));

                    // 팀
                    var $temeListClone = $('#team_list').clone();
                    $team
                        .attr('data-origin-team', originTeam)
                        .html($temeListClone);

                    // 수정 버튼
                    $tr.find('[data-member=edit]').text(btnText.complete);
                    $tr.attr('data-is-edit', 'true');

                    $name.find('input').focus();
                } else {
                    var $nameInput = $name.find('input');
                    var newName = $nameInput.val();
                    var $select = $team.find('select');
                    var $selectedOption = $select.find('option:selected');
                    var selectedText = $selectedOption.text();
                    var selectedValue = $selectedOption.val();

                    if (!val.name($nameInput)) return;

                    $name.text(newName);
                    $team.text(selectedText);

                    update({
                        id: $tr.attr('data-member-id'),
                        name: $tr.find('[data-member=name]').text(),
                        team_id: selectedValue
                    }).done(function() {
                        $tr.find('[data-member=edit]').text(btnText.edit);
                        $tr.attr('data-is-edit', 'false');
                    });
                }
            };
        })();

        // 삭제
        function _handleClickDeleteMember(e) {
            var message = '삭제하시겠습니까?';
            var api = '/admin/member/delete';
            var $tr = $(e.currentTarget).parents('tr');
            var param = {
                id: $tr.attr('data-member-id')
            };

            if (!confirm(message)) return false;
            $.post(api, param, function(response) {
                var res = response;
                $tr.remove();
            });
        }

        $(member_list)
            .on('click', '[data-member="edit"]', edit)
            .on('click', '[data-member="delete"]', _handleClickDeleteMember);
    })();

    // ajax search
    (function() {
        var $searchForm = $('[name="search"]');
        var $tableTbody = $('#member_list tbody');
        var $row = $('<tr><td colspan="4" class="ta-c"></td></tr>').find('td');
        var emptyMessage = '결과가 없습니다.';
        var loadingMessage = '로딩중..';

        var $totalNumber = $('.js_total-number');

        function MustacheRender(tmplName, data) {
            var template = $(tmplName).html();
            Mustache.parse(template);
            var render = Mustache.render(template, { data: data });
            return render;
        }

        function handleSearch(e) {
            try {
                var eTarget = e.currentTarget;
                var api = eTarget.dataset.api;
                var value = $.trim(eTarget.value);
                var param = {
                    sw: value
                };

                if (!value) return;
                $tableTbody.html($row.html(loadingMessage));

                $.getJSON(api, param).done(function(response) {
                    var result;
                    var length = response.length;
                    if (length)
                        result = MustacheRender(
                            '#member_list_mustache',
                            response
                        );
                    else result = $row.html(emptyMessage);
                    $tableTbody.html(result);
                    $totalNumber.html('총 ' + length + ' 명');
                });
            } catch (e) {
                console.log(e);
            }
        }

        // $searchForm.on('keyup', '[name="sw"]', handleSearch);
    })();

    // 구성원 삭제
    $('.js-member-delete').on('click', function(e) {
        if (e) {
            e.preventDefault();
        }

        var eTarget = e.currentTarget;
        var memberId = eTarget.dataset.memberId;
        var api = '/admin/member/delete';
        var messageConfirm = '삭제하시겠습니까?';
        var messageDeleteDone = '삭제 성공';
        var param = {
            id: memberId
        };

        if (!confirm(messageConfirm)) return false;

        $.post(api, param).done(function() {
            alert(messageDeleteDone);
            window.location.href = '/admin/member';
        });
    });
});
