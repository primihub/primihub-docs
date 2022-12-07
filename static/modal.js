var div = document.createElement('div')
div.innerHTML = `
<button type="button" style="display: none;" id="modal-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLabel">感谢关注和使用</h3>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div style="color: #2a2b2e;
        font-size: 16px;
        background: #f4f7f9;
        border: 1px solid #e4e9ec;
        border-bottom: none;
        padding: 10px 5px;
        border-radius: 2px;
        text-align: center;
        margin-bottom: 0;">一个 <a href="https://github.com/primihub/primihub" target="_blank"> Github Star <svg width="12" height="12" aria-hidden="true" viewBox="0 0 24 24"><path data-v-75773ea0="" fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>  激励 PrimiHub 继续前行</div>
      <img style="padding: 1px 0;" src="/img/animation.png" />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">以后再说</button>
      <a target="_blank" href="https://github.com/primihub/primihub" type="button" class="btn btn-primary">现在就去</a>
    </div>
  </div>
</div>
</div>
`

function FireEvent(elem, eventName) {
  if (typeof (elem) == 'object') {
    eventName = eventName.replace(/^on/i, '');
    if (document.all) {
      eventName = "on" + eventName;
      elem.fireEvent(eventName);
    }
    else {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent(eventName, true, true);
      elem.dispatchEvent(evt);
    }
  }

}
setTimeout(() => {
  document.body.append(div)
  setTimeout(() => {
    FireEvent(document.getElementById('modal-button'), 'click')
  }, 1000 * 59)
}, 1000)
