(function () {
    'use strict';

    angular.module('app', [ 'nywton.chessboard']);

    angular.module('app').config(['nywtonChessboardConfigProvider', function nywtonChessConfigConfig(chessboardProvider) {
      chessboardProvider.draggable(true)
        .position('start')
        .pieceTheme('img/chesspieces/wikipedia/{piece}.png');
    }]);



    angular
        .module('app')
        .controller('main', main);

    function main($scope) {

        $scope.boardA = '';
        
        var gameData = [];
        var game = [];
        var vm = this;
        vm.pos = 0;


        var pgnData = '[Event "GMA"] [Site "Wijk aan Zee NED"] [Date "2003.01.15"] [Round "4"] [White "Ponomariov, Ruslan"] [Black "Shirov, Alexei D"] [Result "0-1"] [WhiteElo "2734"] [BlackElo "2723"] [ECO "D44"] [EventDate "2003.01.11"] 1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6{hi you!} 5.Bg5 dxc4 6.e4 b5 7.e5 h6 8.Bh4 g5 9.Nxg5 hxg5 10.Bxg5 Nbd7 11.g3 Bb7 12.Bg2 Qb6 13.exf6 O-O-O 14.O-O c5 15.d5 b4 16.Na4 Qb5 17.a3 exd5 18.axb4 cxb4 19.Be3 Nc5 20.Qg4+ Rd7 21.Qg7 Bxg7 22.fxg7 Rg8 23.Nxc5 Rxg7 24.Nxd7 Qxd7 25.Rxa7 Rg6 26.Rfa1 Re6 27.Bd4 Re2 28.h4 Rd2 29.Be3 Rxb2 30.R1a5 b3 31.Rc5+ Kd8 32.Rxb7 Qxb7 33.Rxd5+ Qxd5 34.Bxd5 Rb1+ 35.Kg2 b2 36.Be4 Rd1 37.Bg5+ Ke8 38.Bf6 b1=Q 39.Bxb1 Rxb1 40.h5 Kf8 41.g4 Rd1 42.Bb2 Kg8 0-1';

        var chess = new Chess();
        var obj = parsePgn(pgnData);
        chess.load_pgn(obj.pgn);
        gameData = chess.history();
        chess.reset();
        game = chess;
        vm.notation = obj.pgn.split(' ');
        vm.data = layout(obj);



        vm.next = function(){
            if (vm.pos < gameData.length ) {
                vm.pos++;
                game.move(gameData[vm.pos-1]);
                $scope.boardA.position(game.fen());
            }
        }

        vm.prev = function(){
            if (vm.pos > 0) {
                vm.pos--;
                game.undo();
                $scope.boardA.position(game.fen());
            }
        }

        vm.start = function(){
            vm.pos = 0;
            game.reset();
            $scope.boardA.position(game.fen());
        }

        vm.end = function(){
            while (vm.pos < gameData.length ) {
                vm.pos++;
                game.move(gameData[vm.pos-1]);
            }
            $scope.boardA.position(game.fen());
        }

        vm.move = function(p){
            if(p>vm.pos) {
                while (vm.pos < p) {
                    vm.pos++;
                    game.move(gameData[vm.pos-1]);
                }
                $scope.boardA.position(game.fen());

            }else if(p<vm.pos){
                game.reset();
                vm.pos = 0;
                while (vm.pos < p) {
                    vm.pos++;
                    game.move(gameData[vm.pos-1]);
                }
                $scope.boardA.position(game.fen());
            }
        }

        vm.save = function(val){
            var t = val;
            vm.pos = 0;    
            vm.notation = [];
            
            var chess = new Chess();
            var obj = parsePgn(t);
            chess.load_pgn(obj.pgn);
            gameData = chess.history();
            chess.reset();
            game = chess;
            vm.notation = obj.pgn.split(' ');
            vm.data = layout(obj);
        }
      
    }


})();


