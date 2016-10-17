/* Barcode Service -
 *
 * @Features
 *
 * @Contributors
 * Yogesh Krishnani
 *
 * @Version
 * 1.0
 *
 */

(function () {
	'use strict';

	angular
	.module(config.appServices)
	.factory('BarcodeService', BarcodeService);

	BarcodeService.$inject = ["$q", "$rootScope"];

	function BarcodeService($q, $rootScope) {

		var _db;

		// We'll need this later.
		var _barcodes;

		return {
			initDB : initDB,

			// We'll add these later.
			getAllBarcodes : getAllBarcodes,
			addBarcode : addBarcode,
			updateBarcode : updateBarcode,
			deleteBarcode : deleteBarcode,
			deleteAllBarcodes : deleteAllBarcodes
		};

		function initDB() {
			// Creates the database or opens if it already exists
			_db = new PouchDB('barcodes', {
				adapter : 'websql',
				location : 'default'
			});
			
			_db.info().then(console.log.bind(console));
		}
		
		function addBarcode(barcode) { 
			if(barcode._id) {
				return $q.when(_db.put(barcode));
			}
			else {
				return $q.when(_db.post(barcode));
			}
		}
		
		function updateBarcode(barcode) {  
			return $q.when(_db.put(barcode));
		}
		
		function deleteBarcode(barcode) {  
			return $q.when(_db.remove(barcode));
		}
		
		function getAllBarcodes() {  
			if (!_barcodes) {
			   return $q.when(_db.allDocs({ include_docs: true}))
					.then(function(docs) {

						// Each row has a .doc object and we just want to send an 
						// array of barcode objects back to the calling controller,
						// so let's map the array to contain just the .doc objects.
						_barcodes = docs.rows.map(function(row) {
							return row.doc;
						});

						// Listen for changes on the database.
						_db.changes({ live: true, since: 'now', include_docs: true})
						   .on('change', onDatabaseChange);

						return _barcodes;
					});
			} else {
				// Return cached data as a promise
				return $q.when(_barcodes);
			}
		}
		
		function deleteAllBarcodes() {
			return $q.when(_db.allDocs({ include_docs: true}))
			.then(function(docs) {
				docs.rows.map(function (row) {
					_db.remove(row.id, row.value.rev);
				});
			});	
		}
		
		function onDatabaseChange(change) {  
			var index = findIndex(_barcodes, change.id);
			var barcode = _barcodes[index];

			if (change.deleted) {
				if (barcode) {
					console.log("Barcode Deleted");
					_barcodes.splice(index, 1); // delete
				}
			} else {
				if (barcode && barcode._id === change.id) {
					console.log("Barcode Updated");
					_barcodes[index] = change.doc; // update
				} else {
					console.log("Barcode Added");
					_barcodes.push(change.doc) // insert
				}
			}
			
			$rootScope.$broadcast('barcodeChangeEvent');
		}

		// Binary search, the array is by default sorted by _id.
		function findIndex(array, id) {  
			var low = 0, high = array.length, mid;
			while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
			}
			return low;
		}

	}

})();