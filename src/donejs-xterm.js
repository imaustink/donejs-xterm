import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './donejs-xterm.stache';
import Terminal from 'xterm';
import 'xterm/dist/xterm.css';

export const ViewModel = DefineMap.extend({
  console: {
    value: new Terminal(),
    type: 'object'
  }
});

export default Component.extend({
  tag: 'donejs-xterm',
  ViewModel,
  view,
	events: {
		inserted(el) {
      if(System.isPlatform("window")) {
        var vm = this.viewModel;
        vm.console.open(el.childNodes[0]);
      }
		}
	}
});