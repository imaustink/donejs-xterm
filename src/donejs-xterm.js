import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './donejs-xterm.stache';
import Terminal from 'xterm';
import 'xterm/dist/xterm.css';

export const Xterm = DefineMap.extend({
  console: 'object'
});

export default Component.extend({
  tag: 'donejs-xterm',
  Xterm,
  view,
	events: {
		inserted(el) {
      if(System.isPlatform("window")) {
        var vm = this.viewModel;
        vm.console = new Terminal();
        vm.console.open(el.childNodes[0]);
      }
		}
	}
});