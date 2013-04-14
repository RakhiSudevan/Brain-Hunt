	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			for(var i = 0; i < this.length; i++) {
				if(this[i] === needle) {
						return i;
				}
			}
			return -1;
		};
	}

	function Location(params) {
		this.id = (params.id) ? params.id : 1;
		this.name = (params.name) ? params.name : "VIT";
		this.path = (params.path) ? params.path : "";

		this.getId = function() {
			return this.id;
		}

		this.setId = function(id) {
			this.id = id;
			return this;
		}

		this.getName = function() {
			return this.name;
		}

		this.setName = function(name) {
			this.name = name;
			return this;
		}

		this.getPath = function() {
			return this.path;
		}

		this.setPath = function(path) {
			this.path = path;
			return this;
		}
	}

	function LocationsVisited() {
		this._h = [];

		this.add = function(id) {
			var flag = false;
			for (var i = 0; i < this._h.length && !flag; ++i) {
				if (this._h[i] == id)
					flag = true;
			}
			if (!flag)
				this._h.push(id);
		}

		this.isAlreadyVisited = function(id) {
			var flag = false;
			for (var i = 0; i < this._h.length && !flag; ++i) {
				if (this._h[i] == id)
					flag = true;
			}
			return flag;
		}

		this.save = function() {
			LocationApp.saveLocations(JSON.stringify(this._h));
		}

		this.load = function(data) {
			this._h = data;
		}
	}

	var Locations = [], _v = new LocationsVisited(), _idx = 0, __i = null, __t = null, __h = null;

	function locInit() {
		var paths = Array ( "img/locations/acropolis.JPG", "img/locations/atlantis.jpg", "img/locations/ayer's rock.jpg", "img/locations/bermudatriangle.jpeg", "img/locations/Beverly Hills .JPG", "img/locations/black forest.jpg", "img/locations/burj khalifa.jpg", "img/locations/cannes.jpg", "img/locations/central perk.JPG", "img/locations/CheesecakeFactory.jpg", "img/locations/dead sea.jpg", "img/locations/disney land.jpg", "img/locations/easter island.jpg", "img/locations/eifel tower.jpg", "img/locations/forbidden city.jpg", "img/locations/golan heights.JPG", "img/locations/golden temple.jpg", "img/locations/Great-Barrier-Reef-Australia.jp", "img/locations/great wall of china.jpeg", "img/locations/hagia sofia.jpg", "img/locations/hawaii.jpg", "img/locations/hogwarts.jpg", "img/locations/Hollywood.jpg", "img/locations/lilypad1.jpg", "img/locations/madame tussauds.jpg", "img/locations/mariaana trench2.jpg", "img/locations/mordor.png", "img/locations/mt. everest.jpg", "img/locations/narnia.jpg", "img/locations/nazca.jpg", "img/locations/north pole.jpg", "img/locations/orlando.jpg", "img/locations/oxford.JPG", "img/locations/patronas towers.jpg", "img/locations/pentagon.jpg", "img/locations/pyramids.jpg", "img/locations/rio de janeiro.jpg", "img/locations/rohan.jpg", "img/locations/sahara desert.jpg", "img/locations/sentosa.jpg", "img/locations/sound of music.jpg", "img/locations/stonehenge.jpg", "img/locations/svalbard.jpg", "img/locations/tajmahal.jpg", "img/locations/the shire.jpg", "img/locations/The-Tower-Bridge.jpg", "img/locations/times square.jpg", "img/locations/tortuga-pirates of the caribbean.jpg", "img/locations/venice.jpg" );
		var names = Array ( "Acropolis", "Atlantis", "Ayer's Rock", "Bermuda Triangle", "Beverly Hills ", "Black Forest", "Burj Khalifa", "Cannes", "Central Perk", "Cheesecake Factory", "Dead Sea", "Disney Land", "Easter Island", "Eiffel Tower", "Forbidden City", "Golan Heights", "Golden Temple", "Great Barrier Reef", "Great Wall of China", "Hagia Sofia", "Hawaii", "Hogwarts", "Hollywood", "Lilypad", "Madame Tussauds", "Mariaana Trench", "Mordor", "Mt.Everest", "Narnia", "Nazca", "North Pole", "Orlando", "Oxford", "Patronas Towers", "Pentagon", "Pyramids", "Rio de Janeiro", "Rohan", "Sahara Desert", "Sentosa", "Sound of Music", "Stonehenge", "Svalbard", "Taj Mahal", "The Shire", "The Tower Bridge", "Times Square", "Tortuga-Pirates of the Caribbean", "Venice" );

		Locations.push(new Location({
			id: 1,
			name: "VIT Chennai Campus",
			path: "img/vit.jpg"
		}));

		var ctx = 0;
		for (; ctx < names.length; ++ctx) {
			Locations.push(new Location({
				id: ctx+2,
				name: names[ctx],
				path: paths[ctx]
			}));
		}

		LocationApp.doLoadInit();
		//LocationApp.getCurrentInit();
	}

	function locGetNext() {
		var n;

		do {
			n = Math.floor(Math.random() * 49 + 1);
		} while (_v.isAlreadyVisited(n));

		_idx = n;
		LocationApp.setCurrent();
	}

	function locStore() {
		_v.add(_idx);
		LocationApp.setCurrent();
		_v.save();
	}

	var LocationApp = {
		decorate: function(i, t, h) {
			if ( i != null) {
				i.innerHTML = '<img src="' + Locations[_idx].getPath() + '" class="img-circle">';
			}
			if (t != null) {
				t.innerHTML = Locations[_idx].getName();
			}
			if (h != null) {
				var str = "";
				for (var _ = 0; _ < Locations.length; ++_) {
					if (_v.isAlreadyVisited(_)) {
						str += '<span><img src="' + Locations[_].getPath() + '" class="img-circle small"><span>' + Locations[_].getName() + '</span></span>';
					}
				}
				h.innerHTML = str;
			}
		},
		doLoadInit: function() {
			var ajax = new AjaxResponder({
				method: 'loadLocations',
				callback: LocationApp.onLoadInit
			});
			ajax.init().service();
		},
		onLoadInit: function(data) {
			_v.load(data);
			LocationApp.getCurrentInit();
		},
		doLoad: function() {
			var ajax = new AjaxResponder({
				method: 'loadLocations',
				callback: LocationApp.onLoad
			});
			ajax.init().service();
		},
		onLoad: function(data) {
			_v.load(data);
		},
		getCurrentInit: function() {
			var ajax = new AjaxResponder({
				method: 'getLocation',
				callback: LocationApp.onGetCurrentInit
			});
			ajax.init().service();
		},
		onGetCurrentInit: function(data) {
			_idx = data;
			if (_v.isAlreadyVisited(_idx)) {
				locGetNext();
			}
			LocationApp.decorate(__i, __t, __h);
		},
		getCurrent: function() {
			var ajax = new AjaxResponder({
				method: 'getLocation',
				callback: LocationApp.onGetCurrent
			});
			ajax.init().service();
		},
		onGetCurrent: function(data) {
			_idx = data;
			LocationApp.decorate(__i, __t, __h);
		},
		setCurrent: function() {
			var ajax = new AjaxResponder({
				method: 'setLocation',
				callback: LocationApp.onSetCurrent
			});
			ajax.init().service(JSON.stringify(_idx));
		},
		onSetCurrent: function(data) {
			
		},
		saveLocations: function(data) {
			var ajax = new AjaxResponder({
				method: 'setLocations',
				callback: LocationApp.onSetLocations
			});
			ajax.init().service(data);
		},
		onSaveLocations: function(data) {

		}
	};
