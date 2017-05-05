import Component from 'can-component';
import DefineMap from 'can-define/map/';
import view from './donejs-xterm.stache';

import './donejs-xterm.less';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm/dist/xterm';
import 'xterm/dist/addons/fit/';

const prompt = 'Cake is a lie $ ';

export const Xterm = DefineMap.extend({
  api: {
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
        var api = vm.api;
        api.open(el.childNodes[0], false);
        api.fit();

        api.prompt = function () {
          api.write('\r\n' + prompt);
        };
        api.write(prompt);

        api.on('key', function (key, ev) {
          var printable = (
            !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
          );

          if (ev.keyCode === 13) {
            api.prompt();
          } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (api.x > prompt.length) {
              api.write('\b \b');
            }
          } else if (printable) {
            api.write(key);
          }
        });
      }
    }
  }
});
