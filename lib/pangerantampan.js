'use babel';

import PangerantampanView from './pangerantampan-view';
import { CompositeDisposable } from 'atom';

export default {

  pangerantampanView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pangerantampanView = new PangerantampanView(state.pangerantampanViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pangerantampanView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pangerantampan:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pangerantampanView.destroy();
  },

  serialize() {
    return {
      pangerantampanViewState: this.pangerantampanView.serialize()
    };
  },

  toggle() {
    console.log('Pangerantampan was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
