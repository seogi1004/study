jui.define("chart.polygon.scissors", [], function() {
    var Polygon = function() {
        this.vertices = [
			{ "x":2.22987, "y":0, "z":0.397806 },
			{ "x":0.682131, "y":0, "z":0.296566 },
			{ "x":0, "y":0, "z":0.25 },
			{ "x":4.9302, "y":0, "z":0.533548 },
			{ "x":3.89522, "y":0, "z":0.496029 },
			{ "x":6.57686, "y":0.063545, "z":0.875 },
			{ "x":6.24586, "y":0.063545, "z":0.919577 },
			{ "x":6.07203, "y":0.063545, "z":0.809719 },
			{ "x":6.6298, "y":0.063545, "z":1.06952 },
			{ "x":6.63057, "y":0.063545, "z":1.25201 },
			{ "x":6.39494, "y":0.063545, "z":1.05777 },
			{ "x":7.25, "y":0.063545, "z":1.5 },
			{ "x":6.92488, "y":0.063545, "z":1.42514 },
			{ "x":7.81581, "y":0.063545, "z":1.31683 },
			{ "x":7.56138, "y":0.063545, "z":1.45084 },
			{ "x":8.05039, "y":0.063545, "z":0.875 },
			{ "x":7.98743, "y":0.063545, "z":1.11815 },
			{ "x":7.83507, "y":0.063545, "z":0.435493 },
			{ "x":7.99466, "y":0.063545, "z":0.632722 },
			{ "x":7.25, "y":0.063545, "z":0.25 },
			{ "x":7.58305, "y":0.063545, "z":0.301767 },
			{ "x":6.72203, "y":0.063545, "z":0.333191 },
			{ "x":6.928, "y":0.063545, "z":0.270549 },
			{ "x":0.700226, "y":0, "z":0.086752 },
			{ "x":2.27812, "y":0, "z":-0.004585 },
			{ "x":3.9495, "y":0, "z":-0.005447 },
			{ "x":6.77414, "y":0.063545, "z":1.22846 },
			{ "x":6.54031, "y":0.063545, "z":0.418672 },
			{ "x":6.29103, "y":0.063545, "z":0.507741 },
			{ "x":6.98812, "y":0.063545, "z":1.33567 },
			{ "x":7.25, "y":0.063545, "z":1.375 },
			{ "x":7.51188, "y":0.063545, "z":1.33567 },
			{ "x":7.72586, "y":0.063545, "z":1.22846 },
			{ "x":6.77414, "y":0.063545, "z":0.52154 },
			{ "x":6.98812, "y":0.063545, "z":0.414328 },
			{ "x":7.8702, "y":0.063545, "z":1.06952 },
			{ "x":7.25, "y":0.063545, "z":0.375 },
			{ "x":7.92314, "y":0.063545, "z":0.875 },
			{ "x":7.51188, "y":0.063545, "z":0.414328 },
			{ "x":7.8702, "y":0.063545, "z":0.680483 },
			{ "x":7.72586, "y":0.063545, "z":0.52154 },
			{ "x":0.682131, "y":0.11928, "z":0.296566 },
			{ "x":0, "y":0.11928, "z":0.25 },
			{ "x":2.22987, "y":0.11928, "z":0.397806 },
			{ "x":3.89522, "y":0.11928, "z":0.496029 },
			{ "x":4.9302, "y":0.11928, "z":0.533548 },
			{ "x":5.37575, "y":0.008393, "z":0.571908 },
			{ "x":5.37575, "y":0.127672, "z":0.571908 },
			{ "x":5.76918, "y":0.044361, "z":0.678897 },
			{ "x":5.76918, "y":0.163641, "z":0.678897 },
			{ "x":6.07203, "y":0.182824, "z":0.809719 },
			{ "x":6.24586, "y":0.182824, "z":0.919577 },
			{ "x":6.39494, "y":0.182824, "z":1.05777 },
			{ "x":6.63057, "y":0.182824, "z":1.25201 },
			{ "x":6.92488, "y":0.182824, "z":1.42514 },
			{ "x":7.25, "y":0.182824, "z":1.5 },
			{ "x":7.56138, "y":0.182824, "z":1.45084 },
			{ "x":7.81581, "y":0.182824, "z":1.31683 },
			{ "x":7.98743, "y":0.182824, "z":1.11815 },
			{ "x":8.05039, "y":0.182824, "z":0.875 },
			{ "x":7.99466, "y":0.182824, "z":0.632722 },
			{ "x":7.83507, "y":0.182824, "z":0.435493 },
			{ "x":7.58305, "y":0.182824, "z":0.301767 },
			{ "x":7.25, "y":0.182824, "z":0.25 },
			{ "x":6.928, "y":0.182824, "z":0.270549 },
			{ "x":6.72203, "y":0.182824, "z":0.333191 },
			{ "x":6.54031, "y":0.182824, "z":0.418672 },
			{ "x":6.29103, "y":0.182824, "z":0.507741 },
			{ "x":5.9721, "y":0.063545, "z":0.523624 },
			{ "x":5.9721, "y":0.182824, "z":0.523624 },
			{ "x":5.64078, "y":0.044361, "z":0.431902 },
			{ "x":5.64078, "y":0.163641, "z":0.431902 },
			{ "x":5.29438, "y":0.008393, "z":0.276847 },
			{ "x":5.29438, "y":0.127672, "z":0.276847 },
			{ "x":4.9302, "y":0, "z":0.102732 },
			{ "x":4.9302, "y":0.11928, "z":0.102732 },
			{ "x":3.9495, "y":0.11928, "z":-0.005447 },
			{ "x":2.27812, "y":0.11928, "z":-0.004585 },
			{ "x":0.700226, "y":0.11928, "z":0.086752 },
			{ "x":7.51188, "y":0.182824, "z":0.414328 },
			{ "x":7.25, "y":0.182824, "z":0.375 },
			{ "x":7.72586, "y":0.182824, "z":0.52154 },
			{ "x":7.8702, "y":0.182824, "z":0.680483 },
			{ "x":7.92314, "y":0.182824, "z":0.875 },
			{ "x":7.8702, "y":0.182824, "z":1.06952 },
			{ "x":7.72586, "y":0.182824, "z":1.22846 },
			{ "x":7.51188, "y":0.182824, "z":1.33567 },
			{ "x":7.25, "y":0.182824, "z":1.375 },
			{ "x":6.98812, "y":0.182824, "z":1.33567 },
			{ "x":6.77414, "y":0.182824, "z":1.22846 },
			{ "x":6.6298, "y":0.182824, "z":1.06952 },
			{ "x":6.57686, "y":0.182824, "z":0.875 },
			{ "x":6.6298, "y":0.063545, "z":0.680483 },
			{ "x":6.6298, "y":0.182824, "z":0.680483 },
			{ "x":6.77414, "y":0.182824, "z":0.52154 },
			{ "x":6.98812, "y":0.182824, "z":0.414328 },
			{ "x":2.22986, "y":0.246333, "z":0.102112 },
			{ "x":0.682128, "y":0.246333, "z":0.203351 },
			{ "x":-2e-06, "y":0.246333, "z":0.249917 },
			{ "x":4.9302, "y":0.246333, "z":-0.033631 },
			{ "x":3.89522, "y":0.246333, "z":0.003888 },
			{ "x":6.57685, "y":0.182789, "z":-0.375083 },
			{ "x":6.24586, "y":0.182789, "z":-0.41966 },
			{ "x":6.07203, "y":0.182789, "z":-0.309802 },
			{ "x":6.6298, "y":0.182789, "z":-0.5696 },
			{ "x":6.63057, "y":0.182789, "z":-0.752093 },
			{ "x":6.39494, "y":0.182789, "z":-0.557851 },
			{ "x":7.25, "y":0.182789, "z":-1.00008 },
			{ "x":6.92488, "y":0.182789, "z":-0.925225 },
			{ "x":7.81581, "y":0.182789, "z":-0.816908 },
			{ "x":7.56138, "y":0.182789, "z":-0.950923 },
			{ "x":8.05039, "y":0.182789, "z":-0.375083 },
			{ "x":7.98743, "y":0.182789, "z":-0.618229 },
			{ "x":7.83507, "y":0.182789, "z":0.064424 },
			{ "x":7.99466, "y":0.182789, "z":-0.132805 },
			{ "x":7.25, "y":0.182789, "z":0.249917 },
			{ "x":7.58305, "y":0.182789, "z":0.19815 },
			{ "x":6.72203, "y":0.182789, "z":0.166726 },
			{ "x":6.928, "y":0.182789, "z":0.229368 },
			{ "x":0.700223, "y":0.246333, "z":0.413165 },
			{ "x":2.27812, "y":0.246333, "z":0.504503 },
			{ "x":3.9495, "y":0.246333, "z":0.505364 },
			{ "x":6.77414, "y":0.182789, "z":-0.728543 },
			{ "x":6.54031, "y":0.182789, "z":0.081245 },
			{ "x":6.29103, "y":0.182789, "z":-0.007823 },
			{ "x":6.98812, "y":0.182789, "z":-0.835755 },
			{ "x":7.25, "y":0.182789, "z":-0.875083 },
			{ "x":7.51188, "y":0.182789, "z":-0.835755 },
			{ "x":7.72586, "y":0.182789, "z":-0.728543 },
			{ "x":6.77414, "y":0.182789, "z":-0.021623 },
			{ "x":6.98812, "y":0.182789, "z":0.08559 },
			{ "x":7.8702, "y":0.182789, "z":-0.5696 },
			{ "x":7.25, "y":0.182789, "z":0.124917 },
			{ "x":7.92314, "y":0.182789, "z":-0.375083 },
			{ "x":7.51187, "y":0.182789, "z":0.08559 },
			{ "x":7.8702, "y":0.182789, "z":-0.180565 },
			{ "x":7.72586, "y":0.182789, "z":-0.021623 },
			{ "x":0.682128, "y":0.127054, "z":0.203351 },
			{ "x":-2e-06, "y":0.127054, "z":0.249917 },
			{ "x":2.22986, "y":0.127053, "z":0.102112 },
			{ "x":3.89522, "y":0.127053, "z":0.003888 },
			{ "x":4.9302, "y":0.127053, "z":-0.033631 },
			{ "x":5.37575, "y":0.237941, "z":-0.071991 },
			{ "x":5.37575, "y":0.118661, "z":-0.071991 },
			{ "x":5.76918, "y":0.201972, "z":-0.17898 },
			{ "x":5.76918, "y":0.082692, "z":-0.17898 },
			{ "x":6.07203, "y":0.063509, "z":-0.309802 },
			{ "x":6.24586, "y":0.063509, "z":-0.41966 },
			{ "x":6.39494, "y":0.063509, "z":-0.557851 },
			{ "x":6.63057, "y":0.063509, "z":-0.752093 },
			{ "x":6.92488, "y":0.063509, "z":-0.925225 },
			{ "x":7.25, "y":0.063509, "z":-1.00008 },
			{ "x":7.56138, "y":0.063509, "z":-0.950923 },
			{ "x":7.81581, "y":0.063509, "z":-0.816908 },
			{ "x":7.98743, "y":0.063509, "z":-0.618229 },
			{ "x":8.05039, "y":0.063509, "z":-0.375083 },
			{ "x":7.99466, "y":0.063509, "z":-0.132805 },
			{ "x":7.83507, "y":0.063509, "z":0.064424 },
			{ "x":7.58305, "y":0.063509, "z":0.19815 },
			{ "x":7.25, "y":0.063509, "z":0.249917 },
			{ "x":6.928, "y":0.063509, "z":0.229368 },
			{ "x":6.72203, "y":0.063509, "z":0.166726 },
			{ "x":6.54031, "y":0.063509, "z":0.081245 },
			{ "x":6.29103, "y":0.063509, "z":-0.007823 },
			{ "x":5.97209, "y":0.182789, "z":-0.023707 },
			{ "x":5.97209, "y":0.063509, "z":-0.023707 },
			{ "x":5.64077, "y":0.201972, "z":0.068015 },
			{ "x":5.64077, "y":0.082692, "z":0.068015 },
			{ "x":5.29438, "y":0.237941, "z":0.22307 },
			{ "x":5.29438, "y":0.118661, "z":0.22307 },
			{ "x":4.9302, "y":0.246333, "z":0.397185 },
			{ "x":4.9302, "y":0.127054, "z":0.397185 },
			{ "x":3.9495, "y":0.127054, "z":0.505364 },
			{ "x":2.27812, "y":0.127054, "z":0.504503 },
			{ "x":0.700223, "y":0.127054, "z":0.413165 },
			{ "x":7.51187, "y":0.063509, "z":0.08559 },
			{ "x":7.25, "y":0.063509, "z":0.124917 },
			{ "x":7.72586, "y":0.063509, "z":-0.021623 },
			{ "x":7.8702, "y":0.063509, "z":-0.180565 },
			{ "x":7.92314, "y":0.063509, "z":-0.375083 },
			{ "x":7.8702, "y":0.063509, "z":-0.5696 },
			{ "x":7.72586, "y":0.063509, "z":-0.728543 },
			{ "x":7.51188, "y":0.063509, "z":-0.835755 },
			{ "x":7.25, "y":0.063509, "z":-0.875083 },
			{ "x":6.98812, "y":0.063509, "z":-0.835755 },
			{ "x":6.77414, "y":0.063509, "z":-0.728543 },
			{ "x":6.6298, "y":0.063509, "z":-0.5696 },
			{ "x":6.57685, "y":0.063509, "z":-0.375083 },
			{ "x":6.6298, "y":0.182789, "z":-0.180566 },
			{ "x":6.6298, "y":0.063509, "z":-0.180566 },
			{ "x":6.77414, "y":0.063509, "z":-0.021623 },
			{ "x":6.98812, "y":0.063509, "z":0.08559 },
			{ "x":4.24493, "y":0.349279, "z":0.218237 },
			{ "x":4.22867, "y":0.349279, "z":0.215004 },
			{ "x":4.22867, "y":0.357727, "z":0.257477 },
			{ "x":4.25871, "y":0.349279, "z":0.227444 },
			{ "x":4.26791, "y":0.349279, "z":0.241223 },
			{ "x":4.27115, "y":0.349279, "z":0.257477 },
			{ "x":4.26791, "y":0.349279, "z":0.273731 },
			{ "x":4.25871, "y":0.349279, "z":0.287511 },
			{ "x":4.24493, "y":0.349279, "z":0.296718 },
			{ "x":4.22867, "y":0.349279, "z":0.299951 },
			{ "x":4.21242, "y":0.349279, "z":0.296718 },
			{ "x":4.19864, "y":0.349279, "z":0.287511 },
			{ "x":4.18943, "y":0.349279, "z":0.273731 },
			{ "x":4.1862, "y":0.349279, "z":0.257477 },
			{ "x":4.18943, "y":0.349279, "z":0.241223 },
			{ "x":4.19864, "y":0.349279, "z":0.227444 },
			{ "x":4.21242, "y":0.349279, "z":0.218237 },
			{ "x":4.25871, "y":0.325219, "z":0.18497 },
			{ "x":4.22867, "y":0.325219, "z":0.178996 },
			{ "x":4.28417, "y":0.325219, "z":0.201983 },
			{ "x":4.30118, "y":0.325219, "z":0.227444 },
			{ "x":4.30716, "y":0.325219, "z":0.257477 },
			{ "x":4.30118, "y":0.325219, "z":0.287511 },
			{ "x":4.28417, "y":0.325219, "z":0.312972 },
			{ "x":4.25871, "y":0.325219, "z":0.329984 },
			{ "x":4.22867, "y":0.325219, "z":0.335958 },
			{ "x":4.19864, "y":0.325219, "z":0.329984 },
			{ "x":4.17318, "y":0.325219, "z":0.312972 },
			{ "x":4.15617, "y":0.325219, "z":0.287511 },
			{ "x":4.15019, "y":0.325219, "z":0.257477 },
			{ "x":4.15617, "y":0.325219, "z":0.227444 },
			{ "x":4.17318, "y":0.325219, "z":0.201983 },
			{ "x":4.19864, "y":0.325219, "z":0.18497 },
			{ "x":4.26791, "y":0.289212, "z":0.162742 },
			{ "x":4.22867, "y":0.289212, "z":0.154937 },
			{ "x":4.30118, "y":0.289212, "z":0.18497 },
			{ "x":4.32341, "y":0.289212, "z":0.218237 },
			{ "x":4.33121, "y":0.289212, "z":0.257477 },
			{ "x":4.32341, "y":0.289212, "z":0.296718 },
			{ "x":4.30118, "y":0.289212, "z":0.329984 },
			{ "x":4.26791, "y":0.289212, "z":0.352212 },
			{ "x":4.22867, "y":0.289212, "z":0.360018 },
			{ "x":4.18943, "y":0.289212, "z":0.352212 },
			{ "x":4.15617, "y":0.289212, "z":0.329984 },
			{ "x":4.13394, "y":0.289212, "z":0.296718 },
			{ "x":4.12613, "y":0.289212, "z":0.257477 },
			{ "x":4.13394, "y":0.289212, "z":0.218237 },
			{ "x":4.15617, "y":0.289212, "z":0.18497 },
			{ "x":4.18943, "y":0.289212, "z":0.162742 },
			{ "x":4.27115, "y":0.246738, "z":0.154937 },
			{ "x":4.22867, "y":0.246738, "z":0.146489 },
			{ "x":4.30716, "y":0.246738, "z":0.178996 },
			{ "x":4.33121, "y":0.246738, "z":0.215004 },
			{ "x":4.33966, "y":0.246738, "z":0.257477 },
			{ "x":4.33121, "y":0.246738, "z":0.299951 },
			{ "x":4.30716, "y":0.246738, "z":0.335958 },
			{ "x":4.27115, "y":0.246738, "z":0.360018 },
			{ "x":4.22867, "y":0.246738, "z":0.368466 },
			{ "x":4.1862, "y":0.246738, "z":0.360018 },
			{ "x":4.15019, "y":0.246738, "z":0.335958 },
			{ "x":4.12613, "y":0.246738, "z":0.299951 },
			{ "x":4.11768, "y":0.246738, "z":0.257477 },
			{ "x":4.12613, "y":0.246738, "z":0.215004 },
			{ "x":4.15019, "y":0.246738, "z":0.178996 },
			{ "x":4.1862, "y":0.246738, "z":0.154937 },
			{ "x":4.22867, "y":-0.105499, "z":0.257477 },
			{ "x":4.22867, "y":-0.097051, "z":0.215004 },
			{ "x":4.24493, "y":-0.097051, "z":0.218237 },
			{ "x":4.25871, "y":-0.097051, "z":0.227444 },
			{ "x":4.26791, "y":-0.097051, "z":0.241223 },
			{ "x":4.27115, "y":-0.097051, "z":0.257477 },
			{ "x":4.26791, "y":-0.097051, "z":0.273731 },
			{ "x":4.25871, "y":-0.097051, "z":0.287511 },
			{ "x":4.24493, "y":-0.097051, "z":0.296718 },
			{ "x":4.22867, "y":-0.097051, "z":0.299951 },
			{ "x":4.21242, "y":-0.097051, "z":0.296718 },
			{ "x":4.19864, "y":-0.097051, "z":0.287511 },
			{ "x":4.18943, "y":-0.097051, "z":0.273731 },
			{ "x":4.1862, "y":-0.097051, "z":0.257477 },
			{ "x":4.18943, "y":-0.097051, "z":0.241223 },
			{ "x":4.19864, "y":-0.097051, "z":0.227444 },
			{ "x":4.21242, "y":-0.097051, "z":0.218237 },
			{ "x":4.22867, "y":-0.072992, "z":0.178996 },
			{ "x":4.25871, "y":-0.072992, "z":0.18497 },
			{ "x":4.28417, "y":-0.072992, "z":0.201983 },
			{ "x":4.30118, "y":-0.072992, "z":0.227444 },
			{ "x":4.30716, "y":-0.072992, "z":0.257477 },
			{ "x":4.30118, "y":-0.072992, "z":0.287511 },
			{ "x":4.28417, "y":-0.072992, "z":0.312972 },
			{ "x":4.25871, "y":-0.072992, "z":0.329984 },
			{ "x":4.22867, "y":-0.072992, "z":0.335958 },
			{ "x":4.19864, "y":-0.072992, "z":0.329984 },
			{ "x":4.17318, "y":-0.072992, "z":0.312972 },
			{ "x":4.15617, "y":-0.072992, "z":0.287511 },
			{ "x":4.15019, "y":-0.072992, "z":0.257477 },
			{ "x":4.15617, "y":-0.072992, "z":0.227444 },
			{ "x":4.17318, "y":-0.072992, "z":0.201983 },
			{ "x":4.19864, "y":-0.072992, "z":0.18497 },
			{ "x":4.22867, "y":-0.036984, "z":0.154937 },
			{ "x":4.26791, "y":-0.036984, "z":0.162742 },
			{ "x":4.30118, "y":-0.036984, "z":0.18497 },
			{ "x":4.32341, "y":-0.036984, "z":0.218237 },
			{ "x":4.33121, "y":-0.036984, "z":0.257477 },
			{ "x":4.32341, "y":-0.036984, "z":0.296718 },
			{ "x":4.30118, "y":-0.036984, "z":0.329984 },
			{ "x":4.26791, "y":-0.036984, "z":0.352212 },
			{ "x":4.22867, "y":-0.036984, "z":0.360018 },
			{ "x":4.18943, "y":-0.036984, "z":0.352212 },
			{ "x":4.15617, "y":-0.036984, "z":0.329984 },
			{ "x":4.13394, "y":-0.036984, "z":0.296718 },
			{ "x":4.12613, "y":-0.036984, "z":0.257477 },
			{ "x":4.13394, "y":-0.036984, "z":0.218237 },
			{ "x":4.15617, "y":-0.036984, "z":0.18497 },
			{ "x":4.18943, "y":-0.036984, "z":0.162742 },
			{ "x":4.22867, "y":0.005489, "z":0.146489 },
			{ "x":4.27115, "y":0.005489, "z":0.154937 },
			{ "x":4.30716, "y":0.005489, "z":0.178996 },
			{ "x":4.33121, "y":0.005489, "z":0.215004 },
			{ "x":4.33966, "y":0.005489, "z":0.257477 },
			{ "x":4.33121, "y":0.005489, "z":0.299951 },
			{ "x":4.30716, "y":0.005489, "z":0.335958 },
			{ "x":4.27115, "y":0.005489, "z":0.360018 },
			{ "x":4.22867, "y":0.005489, "z":0.368466 },
			{ "x":4.1862, "y":0.005489, "z":0.360018 },
			{ "x":4.15019, "y":0.005489, "z":0.335958 },
			{ "x":4.12613, "y":0.005489, "z":0.299951 },
			{ "x":4.11768, "y":0.005489, "z":0.257477 },
			{ "x":4.12613, "y":0.005489, "z":0.215004 },
			{ "x":4.15019, "y":0.005489, "z":0.178996 },
			{ "x":4.1862, "y":0.005489, "z":0.154937 }
        ];

        this.faces = [
			[ 0, 1, 2 ],
			[ 3, 4, 0 ],
			[ 5, 6, 7 ],
			[ 6, 5, 8 ],
			[ 9, 10, 6 ],
			[ 11, 12, 9 ],
			[ 13, 14, 11 ],
			[ 15, 16, 13 ],
			[ 17, 18, 15 ],
			[ 19, 20, 17 ],
			[ 21, 22, 19 ],
			[ 23, 24, 25 ],
			[ 0, 2, 23 ],
			[ 6, 8, 26 ],
			[ 27, 21, 19 ],
			[ 0, 23, 25 ],
			[ 9, 6, 26 ],
			[ 28, 27, 19 ],
			[ 3, 0, 25 ],
			[ 9, 26, 29 ],
			[ 11, 9, 29 ],
			[ 11, 29, 30 ],
			[ 11, 30, 31 ],
			[ 11, 31, 32 ],
			[ 33, 28, 19 ],
			[ 13, 11, 32 ],
			[ 34, 33, 19 ],
			[ 13, 32, 35 ],
			[ 36, 34, 19 ],
			[ 13, 35, 37 ],
			[ 36, 19, 17 ],
			[ 15, 13, 37 ],
			[ 38, 36, 17 ],
			[ 15, 37, 39 ],
			[ 40, 38, 17 ],
			[ 15, 39, 40 ],
			[ 40, 17, 15 ],
			[ 2, 1, 41 ],
			[ 2, 41, 42 ],
			[ 1, 0, 43 ],
			[ 1, 43, 41 ],
			[ 0, 4, 44 ],
			[ 0, 44, 43 ],
			[ 4, 3, 45 ],
			[ 4, 45, 44 ],
			[ 3, 46, 47 ],
			[ 3, 47, 45 ],
			[ 46, 48, 49 ],
			[ 46, 49, 47 ],
			[ 48, 7, 50 ],
			[ 48, 50, 49 ],
			[ 7, 6, 51 ],
			[ 7, 51, 50 ],
			[ 6, 10, 52 ],
			[ 6, 52, 51 ],
			[ 10, 9, 53 ],
			[ 10, 53, 52 ],
			[ 9, 12, 54 ],
			[ 9, 54, 53 ],
			[ 12, 11, 55 ],
			[ 12, 55, 54 ],
			[ 11, 14, 56 ],
			[ 11, 56, 55 ],
			[ 14, 13, 57 ],
			[ 14, 57, 56 ],
			[ 13, 16, 58 ],
			[ 13, 58, 57 ],
			[ 16, 15, 59 ],
			[ 16, 59, 58 ],
			[ 15, 18, 60 ],
			[ 15, 60, 59 ],
			[ 18, 17, 61 ],
			[ 18, 61, 60 ],
			[ 17, 20, 62 ],
			[ 17, 62, 61 ],
			[ 20, 19, 63 ],
			[ 20, 63, 62 ],
			[ 19, 22, 64 ],
			[ 19, 64, 63 ],
			[ 22, 21, 65 ],
			[ 22, 65, 64 ],
			[ 21, 27, 66 ],
			[ 21, 66, 65 ],
			[ 27, 28, 67 ],
			[ 27, 67, 66 ],
			[ 28, 68, 69 ],
			[ 28, 69, 67 ],
			[ 68, 70, 71 ],
			[ 68, 71, 69 ],
			[ 70, 72, 73 ],
			[ 70, 73, 71 ],
			[ 72, 74, 75 ],
			[ 72, 75, 73 ],
			[ 74, 25, 76 ],
			[ 74, 76, 75 ],
			[ 25, 24, 77 ],
			[ 25, 77, 76 ],
			[ 24, 23, 78 ],
			[ 24, 78, 77 ],
			[ 23, 2, 42 ],
			[ 23, 42, 78 ],
			[ 36, 38, 79 ],
			[ 36, 79, 80 ],
			[ 38, 40, 81 ],
			[ 38, 81, 79 ],
			[ 40, 39, 82 ],
			[ 40, 82, 81 ],
			[ 39, 37, 83 ],
			[ 39, 83, 82 ],
			[ 37, 35, 84 ],
			[ 37, 84, 83 ],
			[ 35, 32, 85 ],
			[ 35, 85, 84 ],
			[ 32, 31, 86 ],
			[ 32, 86, 85 ],
			[ 31, 30, 87 ],
			[ 31, 87, 86 ],
			[ 30, 29, 88 ],
			[ 30, 88, 87 ],
			[ 29, 26, 89 ],
			[ 29, 89, 88 ],
			[ 26, 8, 90 ],
			[ 26, 90, 89 ],
			[ 8, 5, 91 ],
			[ 8, 91, 90 ],
			[ 5, 92, 93 ],
			[ 5, 93, 91 ],
			[ 92, 33, 94 ],
			[ 92, 94, 93 ],
			[ 33, 34, 95 ],
			[ 33, 95, 94 ],
			[ 34, 36, 80 ],
			[ 34, 80, 95 ],
			[ 42, 41, 43 ],
			[ 43, 44, 45 ],
			[ 50, 51, 91 ],
			[ 90, 91, 51 ],
			[ 51, 52, 53 ],
			[ 53, 54, 55 ],
			[ 55, 56, 57 ],
			[ 57, 58, 59 ],
			[ 59, 60, 61 ],
			[ 61, 62, 63 ],
			[ 63, 64, 65 ],
			[ 76, 77, 78 ],
			[ 78, 42, 43 ],
			[ 89, 90, 51 ],
			[ 63, 65, 66 ],
			[ 76, 78, 43 ],
			[ 89, 51, 53 ],
			[ 63, 66, 67 ],
			[ 76, 43, 45 ],
			[ 88, 89, 53 ],
			[ 88, 53, 55 ],
			[ 87, 88, 55 ],
			[ 86, 87, 55 ],
			[ 85, 86, 55 ],
			[ 63, 67, 94 ],
			[ 85, 55, 57 ],
			[ 63, 94, 95 ],
			[ 84, 85, 57 ],
			[ 63, 95, 80 ],
			[ 83, 84, 57 ],
			[ 61, 63, 80 ],
			[ 83, 57, 59 ],
			[ 61, 80, 79 ],
			[ 82, 83, 59 ],
			[ 61, 79, 81 ],
			[ 81, 82, 59 ],
			[ 59, 61, 81 ],
			[ 28, 92, 7 ],
			[ 68, 7, 48 ],
			[ 70, 48, 46 ],
			[ 72, 46, 3 ],
			[ 74, 3, 25 ],
			[ 68, 28, 7 ],
			[ 7, 92, 5 ],
			[ 28, 33, 92 ],
			[ 70, 68, 48 ],
			[ 72, 70, 46 ],
			[ 74, 72, 3 ],
			[ 94, 67, 93 ],
			[ 93, 50, 91 ],
			[ 67, 50, 93 ],
			[ 67, 69, 50 ],
			[ 50, 69, 49 ],
			[ 49, 69, 71 ],
			[ 71, 47, 49 ],
			[ 71, 73, 47 ],
			[ 73, 75, 45 ],
			[ 75, 76, 45 ],
			[ 47, 73, 45 ],
			[ 96, 97, 98 ],
			[ 99, 100, 96 ],
			[ 101, 102, 103 ],
			[ 102, 101, 104 ],
			[ 105, 106, 102 ],
			[ 107, 108, 105 ],
			[ 109, 110, 107 ],
			[ 111, 112, 109 ],
			[ 113, 114, 111 ],
			[ 115, 116, 113 ],
			[ 117, 118, 115 ],
			[ 119, 120, 121 ],
			[ 96, 98, 119 ],
			[ 102, 104, 122 ],
			[ 123, 117, 115 ],
			[ 96, 119, 121 ],
			[ 105, 102, 122 ],
			[ 124, 123, 115 ],
			[ 99, 96, 121 ],
			[ 105, 122, 125 ],
			[ 107, 105, 125 ],
			[ 107, 125, 126 ],
			[ 107, 126, 127 ],
			[ 107, 127, 128 ],
			[ 129, 124, 115 ],
			[ 109, 107, 128 ],
			[ 130, 129, 115 ],
			[ 109, 128, 131 ],
			[ 132, 130, 115 ],
			[ 109, 131, 133 ],
			[ 132, 115, 113 ],
			[ 111, 109, 133 ],
			[ 134, 132, 113 ],
			[ 111, 133, 135 ],
			[ 136, 134, 113 ],
			[ 111, 135, 136 ],
			[ 136, 113, 111 ],
			[ 98, 97, 137 ],
			[ 98, 137, 138 ],
			[ 97, 96, 139 ],
			[ 97, 139, 137 ],
			[ 96, 100, 140 ],
			[ 96, 140, 139 ],
			[ 100, 99, 141 ],
			[ 100, 141, 140 ],
			[ 99, 142, 143 ],
			[ 99, 143, 141 ],
			[ 142, 144, 145 ],
			[ 142, 145, 143 ],
			[ 144, 103, 146 ],
			[ 144, 146, 145 ],
			[ 103, 102, 147 ],
			[ 103, 147, 146 ],
			[ 102, 106, 148 ],
			[ 102, 148, 147 ],
			[ 106, 105, 149 ],
			[ 106, 149, 148 ],
			[ 105, 108, 150 ],
			[ 105, 150, 149 ],
			[ 108, 107, 151 ],
			[ 108, 151, 150 ],
			[ 107, 110, 152 ],
			[ 107, 152, 151 ],
			[ 110, 109, 153 ],
			[ 110, 153, 152 ],
			[ 109, 112, 154 ],
			[ 109, 154, 153 ],
			[ 112, 111, 155 ],
			[ 112, 155, 154 ],
			[ 111, 114, 156 ],
			[ 111, 156, 155 ],
			[ 114, 113, 157 ],
			[ 114, 157, 156 ],
			[ 113, 116, 158 ],
			[ 113, 158, 157 ],
			[ 116, 115, 159 ],
			[ 116, 159, 158 ],
			[ 115, 118, 160 ],
			[ 115, 160, 159 ],
			[ 118, 117, 161 ],
			[ 118, 161, 160 ],
			[ 117, 123, 162 ],
			[ 117, 162, 161 ],
			[ 123, 124, 163 ],
			[ 123, 163, 162 ],
			[ 124, 164, 165 ],
			[ 124, 165, 163 ],
			[ 164, 166, 167 ],
			[ 164, 167, 165 ],
			[ 166, 168, 169 ],
			[ 166, 169, 167 ],
			[ 168, 170, 171 ],
			[ 168, 171, 169 ],
			[ 170, 121, 172 ],
			[ 170, 172, 171 ],
			[ 121, 120, 173 ],
			[ 121, 173, 172 ],
			[ 120, 119, 174 ],
			[ 120, 174, 173 ],
			[ 119, 98, 138 ],
			[ 119, 138, 174 ],
			[ 132, 134, 175 ],
			[ 132, 175, 176 ],
			[ 134, 136, 177 ],
			[ 134, 177, 175 ],
			[ 136, 135, 178 ],
			[ 136, 178, 177 ],
			[ 135, 133, 179 ],
			[ 135, 179, 178 ],
			[ 133, 131, 180 ],
			[ 133, 180, 179 ],
			[ 131, 128, 181 ],
			[ 131, 181, 180 ],
			[ 128, 127, 182 ],
			[ 128, 182, 181 ],
			[ 127, 126, 183 ],
			[ 127, 183, 182 ],
			[ 126, 125, 184 ],
			[ 126, 184, 183 ],
			[ 125, 122, 185 ],
			[ 125, 185, 184 ],
			[ 122, 104, 186 ],
			[ 122, 186, 185 ],
			[ 104, 101, 187 ],
			[ 104, 187, 186 ],
			[ 101, 188, 189 ],
			[ 101, 189, 187 ],
			[ 188, 129, 190 ],
			[ 188, 190, 189 ],
			[ 129, 130, 191 ],
			[ 129, 191, 190 ],
			[ 130, 132, 176 ],
			[ 130, 176, 191 ],
			[ 138, 137, 139 ],
			[ 139, 140, 141 ],
			[ 146, 147, 187 ],
			[ 186, 187, 147 ],
			[ 147, 148, 149 ],
			[ 149, 150, 151 ],
			[ 151, 152, 153 ],
			[ 153, 154, 155 ],
			[ 155, 156, 157 ],
			[ 157, 158, 159 ],
			[ 159, 160, 161 ],
			[ 172, 173, 174 ],
			[ 174, 138, 139 ],
			[ 185, 186, 147 ],
			[ 159, 161, 162 ],
			[ 172, 174, 139 ],
			[ 185, 147, 149 ],
			[ 159, 162, 163 ],
			[ 172, 139, 141 ],
			[ 184, 185, 149 ],
			[ 184, 149, 151 ],
			[ 183, 184, 151 ],
			[ 182, 183, 151 ],
			[ 181, 182, 151 ],
			[ 159, 163, 190 ],
			[ 181, 151, 153 ],
			[ 159, 190, 191 ],
			[ 180, 181, 153 ],
			[ 159, 191, 176 ],
			[ 179, 180, 153 ],
			[ 157, 159, 176 ],
			[ 179, 153, 155 ],
			[ 157, 176, 175 ],
			[ 178, 179, 155 ],
			[ 157, 175, 177 ],
			[ 177, 178, 155 ],
			[ 155, 157, 177 ],
			[ 124, 188, 103 ],
			[ 164, 103, 144 ],
			[ 166, 144, 142 ],
			[ 168, 142, 99 ],
			[ 170, 99, 121 ],
			[ 164, 124, 103 ],
			[ 103, 188, 101 ],
			[ 124, 129, 188 ],
			[ 166, 164, 144 ],
			[ 168, 166, 142 ],
			[ 170, 168, 99 ],
			[ 190, 163, 189 ],
			[ 189, 146, 187 ],
			[ 163, 146, 189 ],
			[ 163, 165, 146 ],
			[ 146, 165, 145 ],
			[ 145, 165, 167 ],
			[ 167, 143, 145 ],
			[ 167, 169, 143 ],
			[ 169, 171, 141 ],
			[ 171, 172, 141 ],
			[ 143, 169, 141 ],
			[ 192, 193, 194 ],
			[ 195, 192, 194 ],
			[ 196, 195, 194 ],
			[ 197, 196, 194 ],
			[ 198, 197, 194 ],
			[ 199, 198, 194 ],
			[ 200, 199, 194 ],
			[ 201, 200, 194 ],
			[ 202, 201, 194 ],
			[ 203, 202, 194 ],
			[ 204, 203, 194 ],
			[ 205, 204, 194 ],
			[ 206, 205, 194 ],
			[ 207, 206, 194 ],
			[ 208, 207, 194 ],
			[ 193, 208, 194 ],
			[ 209, 210, 193 ],
			[ 192, 209, 193 ],
			[ 211, 209, 192 ],
			[ 195, 211, 192 ],
			[ 212, 211, 195 ],
			[ 196, 212, 195 ],
			[ 213, 212, 196 ],
			[ 197, 213, 196 ],
			[ 214, 213, 197 ],
			[ 198, 214, 197 ],
			[ 215, 214, 198 ],
			[ 199, 215, 198 ],
			[ 216, 215, 199 ],
			[ 200, 216, 199 ],
			[ 217, 216, 200 ],
			[ 201, 217, 200 ],
			[ 218, 217, 201 ],
			[ 202, 218, 201 ],
			[ 219, 218, 202 ],
			[ 203, 219, 202 ],
			[ 220, 219, 203 ],
			[ 204, 220, 203 ],
			[ 221, 220, 204 ],
			[ 205, 221, 204 ],
			[ 222, 221, 205 ],
			[ 206, 222, 205 ],
			[ 223, 222, 206 ],
			[ 207, 223, 206 ],
			[ 224, 223, 207 ],
			[ 208, 224, 207 ],
			[ 210, 224, 208 ],
			[ 193, 210, 208 ],
			[ 225, 226, 210 ],
			[ 209, 225, 210 ],
			[ 227, 225, 209 ],
			[ 211, 227, 209 ],
			[ 228, 227, 211 ],
			[ 212, 228, 211 ],
			[ 229, 228, 212 ],
			[ 213, 229, 212 ],
			[ 230, 229, 213 ],
			[ 214, 230, 213 ],
			[ 231, 230, 214 ],
			[ 215, 231, 214 ],
			[ 232, 231, 215 ],
			[ 216, 232, 215 ],
			[ 233, 232, 216 ],
			[ 217, 233, 216 ],
			[ 234, 233, 217 ],
			[ 218, 234, 217 ],
			[ 235, 234, 218 ],
			[ 219, 235, 218 ],
			[ 236, 235, 219 ],
			[ 220, 236, 219 ],
			[ 237, 236, 220 ],
			[ 221, 237, 220 ],
			[ 238, 237, 221 ],
			[ 222, 238, 221 ],
			[ 239, 238, 222 ],
			[ 223, 239, 222 ],
			[ 240, 239, 223 ],
			[ 224, 240, 223 ],
			[ 226, 240, 224 ],
			[ 210, 226, 224 ],
			[ 241, 242, 226 ],
			[ 225, 241, 226 ],
			[ 243, 241, 225 ],
			[ 227, 243, 225 ],
			[ 244, 243, 227 ],
			[ 228, 244, 227 ],
			[ 245, 244, 228 ],
			[ 229, 245, 228 ],
			[ 246, 245, 229 ],
			[ 230, 246, 229 ],
			[ 247, 246, 230 ],
			[ 231, 247, 230 ],
			[ 248, 247, 231 ],
			[ 232, 248, 231 ],
			[ 249, 248, 232 ],
			[ 233, 249, 232 ],
			[ 250, 249, 233 ],
			[ 234, 250, 233 ],
			[ 251, 250, 234 ],
			[ 235, 251, 234 ],
			[ 252, 251, 235 ],
			[ 236, 252, 235 ],
			[ 253, 252, 236 ],
			[ 237, 253, 236 ],
			[ 254, 253, 237 ],
			[ 238, 254, 237 ],
			[ 255, 254, 238 ],
			[ 239, 255, 238 ],
			[ 256, 255, 239 ],
			[ 240, 256, 239 ],
			[ 242, 256, 240 ],
			[ 226, 242, 240 ],
			[ 241, 243, 242 ],
			[ 243, 244, 242 ],
			[ 244, 245, 242 ],
			[ 245, 246, 242 ],
			[ 246, 247, 242 ],
			[ 247, 248, 242 ],
			[ 248, 249, 242 ],
			[ 249, 250, 242 ],
			[ 250, 251, 242 ],
			[ 251, 252, 242 ],
			[ 252, 253, 242 ],
			[ 253, 254, 242 ],
			[ 254, 255, 242 ],
			[ 255, 256, 242 ],
			[ 257, 258, 259 ],
			[ 257, 259, 260 ],
			[ 257, 260, 261 ],
			[ 257, 261, 262 ],
			[ 257, 262, 263 ],
			[ 257, 263, 264 ],
			[ 257, 264, 265 ],
			[ 257, 265, 266 ],
			[ 257, 266, 267 ],
			[ 257, 267, 268 ],
			[ 257, 268, 269 ],
			[ 257, 269, 270 ],
			[ 257, 270, 271 ],
			[ 257, 271, 272 ],
			[ 257, 272, 273 ],
			[ 257, 273, 258 ],
			[ 258, 274, 275 ],
			[ 258, 275, 259 ],
			[ 259, 275, 276 ],
			[ 259, 276, 260 ],
			[ 260, 276, 277 ],
			[ 260, 277, 261 ],
			[ 261, 277, 278 ],
			[ 261, 278, 262 ],
			[ 262, 278, 279 ],
			[ 262, 279, 263 ],
			[ 263, 279, 280 ],
			[ 263, 280, 264 ],
			[ 264, 280, 281 ],
			[ 264, 281, 265 ],
			[ 265, 281, 282 ],
			[ 265, 282, 266 ],
			[ 266, 282, 283 ],
			[ 266, 283, 267 ],
			[ 267, 283, 284 ],
			[ 267, 284, 268 ],
			[ 268, 284, 285 ],
			[ 268, 285, 269 ],
			[ 269, 285, 286 ],
			[ 269, 286, 270 ],
			[ 270, 286, 287 ],
			[ 270, 287, 271 ],
			[ 271, 287, 288 ],
			[ 271, 288, 272 ],
			[ 272, 288, 289 ],
			[ 272, 289, 273 ],
			[ 273, 289, 274 ],
			[ 273, 274, 258 ],
			[ 274, 290, 291 ],
			[ 274, 291, 275 ],
			[ 275, 291, 292 ],
			[ 275, 292, 276 ],
			[ 276, 292, 293 ],
			[ 276, 293, 277 ],
			[ 277, 293, 294 ],
			[ 277, 294, 278 ],
			[ 278, 294, 295 ],
			[ 278, 295, 279 ],
			[ 279, 295, 296 ],
			[ 279, 296, 280 ],
			[ 280, 296, 297 ],
			[ 280, 297, 281 ],
			[ 281, 297, 298 ],
			[ 281, 298, 282 ],
			[ 282, 298, 299 ],
			[ 282, 299, 283 ],
			[ 283, 299, 300 ],
			[ 283, 300, 284 ],
			[ 284, 300, 301 ],
			[ 284, 301, 285 ],
			[ 285, 301, 302 ],
			[ 285, 302, 286 ],
			[ 286, 302, 303 ],
			[ 286, 303, 287 ],
			[ 287, 303, 304 ],
			[ 287, 304, 288 ],
			[ 288, 304, 305 ],
			[ 288, 305, 289 ],
			[ 289, 305, 290 ],
			[ 289, 290, 274 ],
			[ 290, 306, 307 ],
			[ 290, 307, 291 ],
			[ 291, 307, 308 ],
			[ 291, 308, 292 ],
			[ 292, 308, 309 ],
			[ 292, 309, 293 ],
			[ 293, 309, 310 ],
			[ 293, 310, 294 ],
			[ 294, 310, 311 ],
			[ 294, 311, 295 ],
			[ 295, 311, 312 ],
			[ 295, 312, 296 ],
			[ 296, 312, 313 ],
			[ 296, 313, 297 ],
			[ 297, 313, 314 ],
			[ 297, 314, 298 ],
			[ 298, 314, 315 ],
			[ 298, 315, 299 ],
			[ 299, 315, 316 ],
			[ 299, 316, 300 ],
			[ 300, 316, 317 ],
			[ 300, 317, 301 ],
			[ 301, 317, 318 ],
			[ 301, 318, 302 ],
			[ 302, 318, 319 ],
			[ 302, 319, 303 ],
			[ 303, 319, 320 ],
			[ 303, 320, 304 ],
			[ 304, 320, 321 ],
			[ 304, 321, 305 ],
			[ 305, 321, 306 ],
			[ 305, 306, 290 ],
			[ 306, 308, 307 ],
			[ 306, 309, 308 ],
			[ 306, 310, 309 ],
			[ 306, 311, 310 ],
			[ 306, 312, 311 ],
			[ 306, 313, 312 ],
			[ 306, 314, 313 ],
			[ 306, 315, 314 ],
			[ 306, 316, 315 ],
			[ 306, 317, 316 ],
			[ 306, 318, 317 ],
			[ 306, 319, 318 ],
			[ 306, 320, 319 ],
			[ 306, 321, 320 ]
        ];
    }

    return Polygon;
}, "chart.polygon.core");