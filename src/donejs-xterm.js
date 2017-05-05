import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './donejs-xterm.stache';

import './donejs-xterm.less';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm/dist/xterm';
import 'xterm/dist/addons/fit/';

export const Xterm = DefineMap.extend({
  fit: 'string',
  prompt: 'string',
  doFit: function() {
    this.terminal.fit();
  },
  terminal: {
    type: '*',
    value: function () {
      return new Terminal();
    }
  }
});

export default Component.extend({
  tag: 'donejs-xterm',
  ViewModel: Xterm,
  view,
  events: {
    inserted(el) {
      if (System.isPlatform("window")) {
        var vm = this.viewModel;
        var terminal = vm.terminal;

        terminal.open(el.childNodes[0], false);

        if (vm.fit) {
          vm.doFit();
        }

        terminal.prompt = function () {
          terminal.write('\r\n' + vm.prompt);
        };
        terminal.write(vm.prompt);

        terminal.on('key', function (key, ev) {
          var printable = (
            !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
          );

          if (ev.keyCode === 13) {
            terminal.prompt();
          } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (terminal.x > vm.prompt.length) {
              terminal.write('\b \b');
            }
          } else if (printable) {
            terminal.write(key);
          }
        });
      }
    }
  }
});
