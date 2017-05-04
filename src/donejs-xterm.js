import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './donejs-xterm.stache';
import Terminal from 'xterm';
import 'xterm/dist/xterm.css';

export const Xterm = DefineMap.extend({
  console: {
    type: 'object',
    value: new Terminal()
  }
});

export default Component.extend({
  tag: 'donejs-xterm',
  ViewModel: Xterm,
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