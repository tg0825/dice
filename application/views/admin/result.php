<main class="col-9">
    <form action="/admin/result" method="get">
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">게임 종류</label>
            <div class="col-sm-10">
                <select name="game_type"class="custom-select my-1 mr-sm-2">
                <?php 
                $game_type_option_list = [
                    '6' => '손(당첨)',
                    '5' => '청소'
                ];
                foreach ($game_type_option_list as $key => $label) :
                    $is_selected = '';
                    if (isset($game_type)) {
                        $is_selected = ($key == $game_type) ? 'selected' : '';
                    }
                ?>
                    <option value="<?=$key?>" <?=$is_selected?>><?=$label?></option>
                <?php
                endforeach;
                ?>
                </select>
            </div>
        </div>
        
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">검색 방법</label>
            <div class="col-sm-10">
                <select name="filter_type" class="custom-select my-1 mr-sm-2">
                <?php 
                $filter_type_option_list = [
                    '2' => '많이 걸린(당첨된) 사람',
                    '3' => '적게 걸린(당첨된) 사람'
                ];
                foreach ($filter_type_option_list as $key => $label) :
                    $is_selected = '';
                    if (isset($filter_type)) {
                        $is_selected = ($key == $filter_type) ? 'selected' : '';
                    }
                ?>
                    <option value="<?=$key?>" <?=$is_selected?>><?=$label?></option>
                <?php
                endforeach;
                ?>
                </select>
            </div>
        </div>
        
        <div class="form-group row">
            <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">검색 시작</button>
            </div>
        </div>
    </form>
    
    <?php 
    if (isset($result_list)) {
    ?>
    <table class="table">
        <thead>
            <?php 
            if ($filter_type == '2' || $filter_type == '3') {
            ?>
            <tr>
                <th style="text-align: center; width:80px">순위</th>
                <th style="text-align: center;">이름</th>
                <th style="text-align: center;">당첨횟수</th>
            </tr>
            <?php
            }
            ?>
        </thead>
        <tbody>
            <?php 
            foreach($result_list as $key => $tr) {
            ?>
            <tr>
                <td style="text-align: center">
                    <?=$key + 1?>
                </td>
                <?php 
                foreach($tr as $td) {
                ?>
                    <td><?=$td?></td>
                <?php 
                }
                ?>
            </tr>
            <?php
            }
            ?>
        </tbody>
    </table>
    <?php
    }
    ?>
</main>
</div>
</div>
</body>
</html>
