'use strict';

/**
 * @ngdoc function
 * @name belajarYeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the belajarYeomanApp
 */
angular.module('posApp')
        .controller('ItemCtrl', function($scope, ItemService, ItemKategoriService, SatuanService) {
            $scope.search = "";
            $scope.oldSearch = "";
            $scope.paging = {
                currentPage: 1,
                totalItems: 0
            };
            $scope.itemType=['INVENTORY', 'NON_INVENTORY', 'JASA'];
            
//            document.getElementById('search').focus();
            $scope.reloadData = function() {
                ItemKategoriService.findAll().success(function(data){
                    $scope.itemKategori = data;
                });    
                SatuanService.findAll().success(function(data){
                    $scope.satuan = data;
                });    
                
//                $scope.paging.currentPage = $scope.search != $scope.oldSearch ? 1 : $scope.currentPage;
                $scope.dataPage = ItemService.query($scope.search, $scope.paging.currentPage, function() {
                    $scope.paging.maxSize = ($scope.dataPage.size);
                    $scope.paging.totalItems = $scope.dataPage.totalElements;
                    $scope.paging.currentPage = parseInt($scope.dataPage.number) + 1;
                    $scope.paging.maxPage = $scope.dataPage.totalPages;
                });
                    
            };

            $scope.reloadData();
//            $scope.$watch('paging.currentPage', $scope.reloadData, true);
            $scope.edit = function(x) {
                $scope.formTitle="Edit Item Kategori";
                
                if (x.id) {
                    ItemService.get(x.id).success(function(data){
                        $scope.currentRecord=data;
                        $scope.original = angular.copy($scope.currentRecord);
                        $('#formModal').modal('show');
                        document.getElementById('nama').focus();
                    });
                }
            };

            $scope.isClean = function() {
                return angular.equals($scope.original, $scope.currentRecord);
            };

            $scope.clear = function() {
                $scope.formTitle="Tambah Item";
                $scope.currentRecord = {};
                $scope.original = null;
                $scope.isNameExists = false;
                $scope.currentRecord.active=true;
                $scope.reloadData();
                
            };

            
            $scope.remove = function(x) {
                bootbox.confirm('Anda yakin untuk mengahapus item[' + x.nama + '] ?', function(result) {
                    if (result) {
                        ItemService.remove(x).success(function() {
                            $scope.clear();
                        });
                    }
                });
            };

            $scope.save = function() {
                console.log('save', $scope.currentRecord);
                if($scope.currentRecord.nama===''){
                    bootbox.alert('Silahkan masukkan nama barang terlebih dulu!');
                    $('#nama').focus();
                    return;
                }
                ItemService.findByNama($scope.currentRecord.nama).success(function(data) {
                    if (data && (data.id !== $scope.currentRecord.id)) {
                        $scope.isNameExists = true;
                        return;
                    } else {
                        
                        ItemService.save($scope.currentRecord).success(function() {
                            $('#formModal').modal('hide');
                            bootbox.alert('Simpan item sukses ');
                            $scope.clear();
                        });
                    }
                });
            };

        });
