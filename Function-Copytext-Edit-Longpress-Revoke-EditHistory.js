
window.displayNames = window.displayNames || {
  huyhoang: "Huy Hoàng",
  mingcki: "Minh Chi"
};

function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), 1500);
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); } catch(e){}
  document.body.removeChild(ta);
}

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('reply-sheet-overlay');
  const sheet   = document.getElementById('reply-sheet');
  const btnReply= document.getElementById('bs-reply-btn');
  const btnCopy = document.getElementById('bs-copy-btn');
  const btnDelete= document.getElementById('bs-delete-btn');
  const btnMore= document.getElementById('bs-more-btn');

  let currentTargetItem = null;
  let isSheetOpen = false;

  function openSheetFor(item) {
    currentTargetItem = item;
    window._lastPressedMessage = item;   // <-- thêm dòng này
    overlay.hidden = false; overlay.getBoundingClientRect();
    overlay.classList.add('show'); sheet.classList.add('show');
    document.body.classList.add('bs-open');
    isSheetOpen = true; try { history.pushState({sheet:true}, ""); } catch(e){}
  }
  function closeSheet() {
    overlay.classList.remove('show'); sheet.classList.remove('show');
    document.body.classList.remove('bs-open'); currentTargetItem = null;
    isSheetOpen = false; setTimeout(()=>{ overlay.hidden = true; }, 220);
  }

  // ✨ NEW: hook đóng sheet khi chọn reaction trong một popup cụ thể
  function hookPopupForClose(popup){
    if (!popup || popup.dataset.closeHooked) return;
    popup.dataset.closeHooked = '1';

    const handler = function(e){
      // Nếu click vào chính popup (khoảng trống), bỏ qua
      if (e.target === popup) return;

      // Xác định “icon/emoji/button” thường gặp trong popup
      const clickable = e.target.closest?.(
        'button, [role="button"], [data-reaction], [data-emoji], .reaction, .emoji, i, svg, img, span'
      );

      if (!clickable || clickable === popup) return;

      // Đợi gán reaction xong rồi mới đóng sheet để không ảnh hưởng logic khác
      setTimeout(() => { if (isSheetOpen) closeSheet(); }, 0);
    };

    // Bắt ở capture phase để không bị stopPropagation chặn
    ['click','pointerup','touchend'].forEach(evt => {
      popup.addEventListener(evt, handler, {capture:true, passive:true});
    });
  }

  // Đóng khi click ngoài (giữ nguyên ý đồ cũ)
  document.addEventListener('click', function(e){
    if (isSheetOpen && !e.target.closest('.bs-sheet') && !e.target.closest('.reaction-popup')) {
      closeSheet();
    }
  });

  window.addEventListener('popstate', function(){
    if (isSheetOpen){
      closeSheet();
      try { history.pushState(null, ""); } catch(e){}
    }
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeSheet(); });

  // Reply logic
  function handleReplyFromItem(li) {
    if (!window.jQuery) return;
    const $ = window.jQuery;
    const $messageEl = $(li);
    const $replyPreview = $messageEl.find('.reply-preview');
    let messageContent = '';
    if ($replyPreview.length > 0) messageContent = $replyPreview.find('.replied-message').html();
    else messageContent = $messageEl.find('.message-container').html();
    const messageUser = $messageEl.data('user');
    const $img = $messageEl.find('.message-container img');
    if ($img.length > 0) messageContent = `<img src="${$img.attr('src')}" style="max-width:100px; height:auto;">`;
    $('.reply-container').show();
    const displayName = (window.displayNames||{})[messageUser] || messageUser;
    $('.reply-header').text(`Đang trả lời: ${displayName}`);
    $('.reply-content').html(messageContent);
    const input = $('.message'); input.data('reply-to', $messageEl.data('message-id'));
    setTimeout(() => { input.focus(); }, 300);
  }

  // Action buttons
  btnReply.addEventListener('click', function () { if (currentTargetItem) handleReplyFromItem(currentTargetItem); closeSheet(); });
  btnCopy.addEventListener('click', function () {
  if (!currentTargetItem) { closeSheet(); return; }

  let textToCopy = "";

  // 1. Thử lấy nội dung chính
  const msgPart = currentTargetItem.querySelector('.message-container');
  if (msgPart) {
    textToCopy = msgPart.textContent.trim();
    if (!textToCopy) {
      const img = msgPart.querySelector('img');
      if (img?.src) textToCopy = img.src;
    }
  }

  // 2. Nếu không có message-container, thử lấy replied-message
  if (!textToCopy) {
    const replyPart = currentTargetItem.querySelector('.reply-preview .replied-message');
    if (replyPart) {
      textToCopy = replyPart.textContent.trim();
    }
  }

  if (!textToCopy) {
    showToast("Không có nội dung để sao chép");
    closeSheet();
    return;
  }

  // 3. Copy vào clipboard
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(textToCopy)
      .then(()=> showToast("Đã sao chép nội dung"))
      .catch(()=>{
        fallbackCopyText(textToCopy);
        showToast("Đã sao chép nội dung");
      })
      .finally(()=> closeSheet());
  } else {
    fallbackCopyText(textToCopy);
    showToast("Đã sao chép nội dung");
    closeSheet();
  }
});


  //btnDelete.addEventListener('click', closeSheet);
  btnMore.addEventListener('click', closeSheet);

  // Long press (giữ nguyên logic cũ) + ✨ NEW: hook popup khi mở
  function attachHoldHandlersToItem(item) {
  if (!item || item.classList.contains('revoked')) return; // <-- important: skip revoked items

  let holdTimer, startX, startY, didHold = false;
  const effectTargets = [
    item.querySelector('.message-container.sender'),
    item.querySelector('.message-container.receiver'),
    item.querySelector('.reply-preview.receiver .replied-message'),
    item.querySelector('.reply-preview.sender .replied-message'),
  ].filter(Boolean);

  item.addEventListener('touchstart', function (e) {
    // extra guard: item may have been marked revoked after listeners were attached
    if (item.classList.contains('revoked')) return;
    if (!e.touches?.[0]) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    didHold = false;

    holdTimer = setTimeout(() => {
      // double-check again before showing sheet/popup
      if (item.classList.contains('revoked')) return;
      didHold = true;

      effectTargets.forEach(el => el.classList.add('message-hold-effect'));
      if (navigator.vibrate) navigator.vibrate(10);

      const $msg = $(item);

      // === BỔ SUNG: tạo DOM reaction nếu chưa có (lazy nhưng ngay lập tức) ===
      if ($msg.find('.reaction-btn').length === 0) {
        $msg.append(`
          <button class="reaction-btn">
            <svg viewBox="0 0 20 20" width="16" height="16" class="button-reaction-mess">
              <g transform="translate(-446 -398)">
                <path d="M456 410a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-12a2 2 0 1 1 0-4 2 2 0 0 1 0 4"></path>
              </g>
            </svg>
          </button>
          <div class="reaction-popup">
            <div class="reaction-icon" data-reaction="❤️">❤️</div>
            <div class="reaction-icon" data-reaction="😆">😆</div>
            <div class="reaction-icon" data-reaction="😮">😮</div>
            <div class="reaction-icon" data-reaction="😢">😢</div>
            <div class="reaction-icon" data-reaction="😡">😡</div>
            <div class="reaction-icon" data-reaction="👍">👍</div>
            <div class="reaction-icon reaction-more" title="Xem thêm"><i class="fas fa-plus"></i></div>
          </div>
        `);
      }
      // =====================================================================

      // sau khi chắc chắn DOM tồn tại → lấy popup
      const reactionBtn = item.querySelector('.reaction-btn');
      const popup = reactionBtn?.nextElementSibling;

      // tránh synthetic click ẩn popup ngay sau khi nhấn giữ
      window._suppressDocClickUntil = Date.now() + 400;

      // hiển thị popup (ẩn các popup khác trước)
      if (popup?.classList.contains('reaction-popup')) {
        document.querySelectorAll('.reaction-popup').forEach(p => p.style.display = 'none');
        popup.style.display = 'block';
        try { new Audio("https://cdn.jsdelivr.net/gh/zalocloud/mp3/open-popup-messenger-2.mp3").play(); } catch (e) {}
        hookPopupForClose(popup);
      }

      // hiển thị bottom sheet cùng lúc
      openSheetFor(item);
    }, 500);
  }, { passive: true });

  item.addEventListener('touchend', function () {
    clearTimeout(holdTimer);
    if (!didHold) {
      // tap — keep normal behavior
    }

    effectTargets.forEach(el => {
      el.classList.remove('message-hold-effect');
      el.classList.add('message-zoom-out');
      el.addEventListener('animationend', function cleanup() {
        el.classList.remove('message-zoom-out');
        el.removeEventListener('animationend', cleanup);
      });
    });
  });

  item.addEventListener('touchmove', function (e) {
    if (!e.touches?.[0]) return;
    const moveX = e.touches[0].clientX, moveY = e.touches[0].clientY;
    if (Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
      clearTimeout(holdTimer);
      effectTargets.forEach(el => el.classList.remove('message-hold-effect'));
    }
  }, { passive: true });
}




  // Hàm gắn class .has-reply
function markReplyMessages(li) {
  if (li.querySelector('.reply-preview')) {
    li.classList.add('has-reply');
  } else {
    li.classList.remove('has-reply');
  }
}

// Khởi tạo ban đầu
document.querySelectorAll('li[data-message-id]').forEach(li => {
  attachHoldHandlersToItem(li);
  markReplyMessages(li); // <-- thêm ở đây
});

const container = document.querySelector('.chat-container, ul.chat-container') || document;
new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(node => {
  if (node.nodeType === 1) {
    if (node.matches?.('li[data-message-id]')) {
      attachHoldHandlersToItem(node);
      markReplyMessages(node); // <-- thêm ở đây
    }
    node.querySelectorAll?.('li[data-message-id]').forEach(li => {
      attachHoldHandlersToItem(li);
      markReplyMessages(li); // <-- thêm ở đây
    });
  }
}))).observe(container, {childList:true, subtree:true});


  // ✨ NEW (phòng hờ): fallback toàn cục — nếu click/pointer/touch vào BẤT KỲ phần tử con trong .reaction-popup thì cũng đóng sheet
  ['click','pointerup','touchend'].forEach(evt => {
    document.addEventListener(evt, function(e){
      const popup = e.target.closest?.('.reaction-popup');
      if (!popup) return;
      if (e.target === popup) return; // bấm vào nền trống của popup thì thôi
      setTimeout(() => { if (isSheetOpen) closeSheet(); }, 0);
    }, {capture:true, passive:true});
  });
  
// === Edit-message improved handler (mobile first) ===
(function($){
  // ==== CONFIG ====
  const EDIT_WINDOW = 15 * 60 * 1000; // 15 phút
  
  // ==== GLOBAL FLAG ====
  window.isEditing = false;   // <<< thêm dòng này

  // ==== STATE ====
  let editingMessageId = null;
  let editingLi = null;
  let originalText = '';
  let preEditDraft = '';

  // ==== SELECTORS ROBUST ====
  // tìm input (thử nhiều khả năng)
  const $input = $('input.message, textarea.message, input#message, textarea#message, input[name="message"], textarea[name="message"]').filter(':visible').first();
  // tìm container nút (ưu tiên .button-container nếu có)
  let $buttonContainer = $('.button-container').first();
  if (!$buttonContainer.length) {
    // fallback: tìm quanh input
    $buttonContainer = $input.closest('.composer, .chat-footer, .message-composer, .input-area, .send-area').first();
  }
  if (!$buttonContainer.length) {
    // global fallback
    $buttonContainer = $('body');
  }
  // tìm nút send chính xác trong container
  let $sendBtn = $buttonContainer.find('.send-btn, .btn-send, button.send, #sendBtn').first();
  if (!$sendBtn.length) $sendBtn = $('.send-btn, .btn-send, button.send, #sendBtn').filter(':visible').first();

  // create check (update) button if missing - placed next to sendBtn
  let $checkBtn = $('#edit-check-btn');
  if (!$checkBtn.length) {
    const $btn = $('<button id="edit-check-btn" aria-label="Cập nhật tin nhắn" title="Cập nhật tin nhắn" type="button" style="display:none;"><i class="fas fa-check" aria-hidden="true"></i></button>');
    // copy classes from send button so looks consistent
    try {
      const sendClasses = ($sendBtn.attr('class') || '').trim();
      if (sendClasses) $btn.addClass(sendClasses + ' edit-check-btn');
    } catch (e) {}
    // insert after sendBtn if exists, otherwise append to buttonContainer
    if ($sendBtn && $sendBtn.length) $sendBtn.after($btn);
    else $buttonContainer.append($btn);
    $checkBtn = $('#edit-check-btn');
  }
  $checkBtn.hide().prop('disabled', true);

  // helper: parse timestamp from id like "msg-<ms>"
  function parseTsFromId(msgId){
    if (!msgId) return 0;
    return parseInt(String(msgId).replace(/^msg-/,'')) || 0;
  }
  function liHasMedia($li){
    return $li && $li.find && $li.find('img, video, audio, .media-file').length > 0;
  }

  // Ensure center modal exists (keeps your code's modal logic)
  function ensureCenterModal(){
    if ($('#center-more-modal').length) return $('#center-more-modal');
    const modalHtml = `
      <div id="center-more-modal" class="center-more-modal" hidden>
        <div class="center-more-inner" role="dialog" aria-modal="true">
          <h3 class="center-more-title">Xem thêm</h3>
          <ul class="center-more-list" style="margin:0;padding:0;">
            <li data-action="pin">Ghim</li>
            <li data-action="edit">Chỉnh sửa</li>
            <li data-action="forward">Chuyển tiếp</li>
            <li data-action="remind">Nhắc lại</li>
          </ul>
          <button class="center-more-close" aria-label="Đóng" style="position:absolute;top:8px;right:12px;background:transparent;border:0;font-size:22px;">×</button>
        </div>
      </div>`;
    $('body').append(modalHtml);
    if (!$('#center-more-modal-style').length) {
      const css = `
        .center-more-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:1300; background:rgba(0,0,0,0.35); }
        .center-more-modal[hidden]{ display:none; }
        .center-more-inner{ width:calc(100% - 48px); max-width:360px; background:#2b2b2b; color:#fff; border-radius:18px; padding:18px; box-shadow:0 10px 30px rgba(0,0,0,0.4); text-align:left; position:relative;}
        .center-more-title{ margin:0 0 8px 0; font-size:20px; font-weight:700;}
        .center-more-list{ list-style:none; padding:0; margin:6px 0 0 0;}
        .center-more-list li{ padding:12px 10px; border-radius:12px; margin-bottom:8px; cursor:pointer; font-size:16px; }
        .center-more-list li:hover{ background:rgba(255,255,255,0.04); }
      `;
      $('<style id="center-more-modal-style"></style>').text(css).appendTo('head');
    }
    return $('#center-more-modal');
  }
  const $centerModal = ensureCenterModal();

  // Modal open/close + action wiring (giữ nguyên logic)
  function openCenterModalFor(li) {
  // ✳️ 1. Ẩn toàn bộ reaction-popup khi mở center modal
  $('.reaction-popup').hide();
  // ✳️ 2. Nếu có bottom sheet reaction đang mở (trên mobile) thì đóng luôn
  if (typeof window.closeBottomSheetReaction === 'function') {
    try { window.closeBottomSheetReaction(); } catch (e) {}
  } else {
    $('.bottomSheet-face-reaction, #bottomSheet-face-reaction').hide();
  }

  // ✳️ 3. Giữ nguyên logic gốc
  const $li = li ? $(li) : null;
  $centerModal.data('target-li', li || null);

  const $editAction = $centerModal.find('[data-action="edit"]');
  if (!$li) {
    $editAction.hide();
  } else {
    const msgId = $li.attr('data-message-id') || $li.data('message-id');
    const user = $li.attr('data-user') || $li.data('user');
    const ts = parseTsFromId(msgId);
    const isMine = (user === window.currentUser);
    const withinTime = (Date.now() - ts) <= EDIT_WINDOW;
    const hasMedia = liHasMedia($li);
    if (!isMine || !withinTime || hasMedia) $editAction.hide(); else $editAction.show();
  }

  // ✳️ 4. Hiển thị modal
  $centerModal.removeAttr('hidden');
  document.body.classList.add('bs-open');
}

  function closeCenterModal(){
    $centerModal.attr('hidden', true).removeData('target-li');
    document.body.classList.remove('bs-open');
  }

  function resolveTargetLiFallback(){
    let li = $centerModal.data('target-li') || window.currentTargetItem || window._lastPressedMessage || null;
    if (!li) {
      const sheet = document.querySelector('#reply-sheet, .bs-sheet, #sheet, .reply-sheet');
      if (sheet) {
        const tid = sheet.getAttribute('data-target-id') || sheet.dataset.targetId || sheet.getAttribute('data-message-id') || sheet.dataset.messageId;
        if (tid) li = document.querySelector(`li[data-message-id="${tid}"]`);
      }
    }
    if (!li) {
      li = document.querySelector('li.active[data-message-id], li.selected[data-message-id], li[data-selected="true"]') || null;
    }
    return li;
  }

  $(document).on('click', '#bs-more-btn, .bs-more-btn, .reaction-more', function(e){
    e.preventDefault(); e.stopPropagation();
    const li = resolveTargetLiFallback();
    openCenterModalFor(li);
  });
  
  
function showConfirmRevokedSheet() {
  return new Promise(resolve => {
    const sheet = document.getElementById('bottomSheet-RevokedMobi');
    const overlay = document.getElementById('overlay-RevokedMobi');
    const yesBtn = document.getElementById('confirmRevoked-yes');
    const noBtn = document.getElementById('confirmRevoked-no');

    // 👉 Khi bật sheet xác nhận, đóng hết reply sheet / reaction sheet cũ
    document.querySelectorAll('.bs-sheet, #reply-sheet, .bottomSheet-face-reaction, #bottomSheet-face-reaction')
      .forEach(el => {
        // Dùng cơ chế thống nhất: gỡ class 'show' thay vì set display:none
        el.classList.remove('show');

        // Gỡ inline display nếu có (tránh kẹt DOM về sau)
        if (el.style && el.style.display === 'none') el.style.display = '';

        // Nếu element bị hidden (do overlay khác), clear lại
        if (el.hasAttribute && el.hasAttribute('hidden')) el.removeAttribute('hidden');
      });

    // Gọi hàm đóng sheet toàn cục nếu có, đảm bảo không còn trạng thái bs-open
    try { if (typeof closeSheet === 'function') closeSheet(); } catch (e) {}
    try { if (typeof window.closeBottomSheetReaction === 'function') window.closeBottomSheetReaction(); } catch (e) {}

    document.body.classList.remove('bs-open');

    // 👉 Mở bottom sheet xác nhận
    // ✳️ Bổ sung: Ẩn tất cả popup reaction trước khi bật sheet thu hồi
    document.querySelectorAll('.reaction-popup').forEach(p => p.style.display = 'none');

    sheet.style.transition = 'transform 0.3s ease';
    sheet.style.transform = 'translateY(0)';
    overlay.style.display = 'block';
    document.body.classList.add('no-scroll-RevokedMobi');

    // 👉 Hàm đóng bottom sheet xác nhận
    const closeConfirmRevokedSheet = (result) => {
      sheet.style.transition = 'transform 0.25s ease';
      sheet.style.transform = 'translateY(100%)';
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll-RevokedMobi');

      // ✅ Reset lại các sheet để tránh bị "kẹt" overlay hoặc display:none
      document.querySelectorAll('.bs-sheet, #reply-sheet, .bottomSheet-face-reaction, #bottomSheet-face-reaction')
        .forEach(el => {
          if (el.style && el.style.display === 'none') el.style.display = '';
        });

      // Gỡ listener để tránh leak bộ nhớ
      yesBtn.removeEventListener('click', onYes);
      noBtn.removeEventListener('click', onNo);
      overlay.removeEventListener('click', onOverlay);

      resolve(result);
    };

    // 👉 Sự kiện người dùng chọn
    const onYes = () => closeConfirmRevokedSheet(true);
    const onNo = () => closeConfirmRevokedSheet(false);
    const onOverlay = () => closeConfirmRevokedSheet(false);

    yesBtn.addEventListener('click', onYes);
    noBtn.addEventListener('click', onNo);
    overlay.addEventListener('click', onOverlay);
  });
}



  
  
  /* ============================
   MOBILE: thu hồi tin nhắn từ bottom sheet (bs-delete-btn)
   - Chèn đoạn này gần các handler bottom-sheet (sau resolveTargetLiFallback / #bs-more-btn handlers)
   - Dùng same logic như PC: showConfirmRevoked() + messages.child(msgId).update(...)
   ============================ */
$(document).on('click', '#bs-delete-btn', async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const $btn = $(this);
  if ($btn.prop('disabled')) return;
  $btn.prop('disabled', true);

  try {
    // 1) xác định <li> mục tiêu
    let li = null;
    if (typeof resolveTargetLiFallback === 'function') {
      li = resolveTargetLiFallback();
    }
    if (!li && window.bottomSheetTargetMsg) {
      li = (window.bottomSheetTargetMsg instanceof jQuery)
        ? window.bottomSheetTargetMsg[0]
        : window.bottomSheetTargetMsg;
    }
    if (!li) {
      const sheet = document.querySelector('#reply-sheet, .bs-sheet, #sheet, .reply-sheet');
      const tid = sheet && (sheet.dataset.targetId || sheet.dataset.messageId);
      if (tid) li = document.querySelector(`li[data-message-id="${tid}"]`);
    }

    if (!li) {
      showToast && showToast('Không xác định được tin nhắn để thu hồi.');
      return;
    }

    const $li = $(li);
    const msgId = $li.data('message-id') || '';
    const user = $li.data('user') || '';
    const ts = parseInt(String(msgId).replace(/^msg-/, ''), 10) || 0;

    if (!msgId) {
      showToast && showToast('Không tìm thấy ID tin nhắn.');
      return;
    }
    if (user !== window.currentUser) {
      showToast && showToast('Bạn chỉ có thể thu hồi tin nhắn của chính mình.');
      return;
    }
    if ((Date.now() - ts) > (10 * 60 * 1000)) {
      showToast && showToast('Đã quá 10 phút, không thể thu hồi.');
      return;
    }

    // 3️⃣ Gọi popup xác nhận: PC dùng showConfirmRevoked(), Mobi dùng bottom sheet
    let ok = false;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      ok = await showConfirmRevokedSheet(); // mobile bottom sheet
    } else if (typeof showConfirmRevoked === 'function') {
      ok = await showConfirmRevoked(); // PC popup confirm riêng của bạn
    } else {
      ok = confirm('Bạn có chắc chắn muốn thu hồi tin nhắn này?'); // fallback
    }
    if (!ok) return;

    // 4️⃣ Thực hiện update (Firebase)
    await new Promise((resolve, reject) => {
      messages.child(msgId).update({
        revoked: true,
        revokedBy: window.currentUser,
        revokedAt: Date.now()
      }, err => err ? reject(err) : resolve());
    });

    showToast && showToast('Đã thu hồi tin nhắn.');

    // 5️⃣ Đóng bottom sheet nếu đang mở
    if (typeof closeSheet === 'function') {
      try { closeSheet(); } catch (e) {}
    } else if (typeof window.closeBottomSheetReaction === 'function') {
      try { window.closeBottomSheetReaction(); } catch (e) {}
    } else {
      $('.bs-sheet, #reply-sheet, .bottomSheet-face-reaction, #bottomSheet-face-reaction').hide();
      document.body.classList.remove('bs-open');
    }

  } catch (err) {
    console.error('Thu hồi thất bại (mobile):', err);
    showToast && showToast('Thu hồi thất bại.');
  } finally {
    $btn.prop('disabled', false);
  }
});


  

  $(document).on('click', '#center-more-modal, #center-more-modal .center-more-close', function(e){
    if (e.target !== this && !$(this).is('.center-more-close')) return;
    closeCenterModal();
  });

  $(document).on('click', '#center-more-modal [data-action]', function(e){
    e.preventDefault();
    const action = $(this).data('action');
    const li = $centerModal.data('target-li') || null;
    closeCenterModal();
    if (!li && action === 'edit') {
      showToast && showToast('Không xác định được tin nhắn để chỉnh sửa.');
      return;
    }
    if (action === 'edit') startEditMessage(li);
    else showToast && showToast('Chức năng tạm chưa cài: ' + action);
  });

  // ==== startEditMessage ====
  function startEditMessage(li){
    if (!li) return;
    window.isEditing = true;
    const $li = $(li);
    const msgId = $li.attr('data-message-id') || $li.data('message-id');
    const user = $li.attr('data-user') || $li.data('user');
    if (user !== window.currentUser) {
      showToast && showToast('Bạn chỉ có thể chỉnh sửa tin của chính mình.');
      return;
    }
    const ts = parseTsFromId(msgId);
    if (!ts || (Date.now() - ts) > EDIT_WINDOW) {
      showToast && showToast('Đã hết thời gian sửa tin (15 phút).');
      return;
    }
    if (liHasMedia($li)) {
      showToast && showToast('Không thể sửa tin chứa media.');
      return;
    }

    // set state
    editingMessageId = msgId;
    window._editingMessageId = msgId; // global flag other code can check
    window.isEditing = true; 
    editingLi = $li;
    
    let content = $li.find('.replied-message').text().trim();
if (!content) {
  content = $li.find('.message-text').text().trim();
}
originalText = content;

    
    preEditDraft = $input.val() || '';

    // show reply/preview
    $('.reply-container').show();
    $('.reply-header').text('Chỉnh sửa tin nhắn');
    $('.reply-content').text(originalText);

    // put original text in input and focus at end
    $input.val(originalText);
    setTimeout(function(){
      $input.focus();
      const el = $input.get(0);
      if (el && el.setSelectionRange) {
        const len = $input.val().length;
        el.setSelectionRange(len, len);
      }
    }, 60);

    // hide reaction heart & left icons
    const $heartBtn = $('#reaction-heart, .reaction-heart, .reaction-heart-btn').filter(':visible').first();
    if ($heartBtn && $heartBtn.length) $heartBtn.hide();
    $('.upload-images, .sticker-chatfb, .gif-chatfb, .upload-voice').hide();

    // hide original send and show check (update) button in same place
    if ($sendBtn && $sendBtn.length) {
      // ensure check sits immediately after sendBtn for position
      $checkBtn.insertAfter($sendBtn);
      $sendBtn.hide().prop('disabled', true);
    } else {
      // fallback: append check to buttonContainer
      $buttonContainer.append($checkBtn);
    }
    $checkBtn.show().removeClass('enabled').prop('disabled', true).css({display:'inline-block', cursor:'not-allowed'});

    // input listener: enable check when content differs
    $input.off('input.editMode').on('input.editMode', function(){
      const cur = $input.val() || '';
      const trimmed = cur.trim();
      if (trimmed.length > 0 && trimmed !== (originalText || '').trim()) {
        $checkBtn.prop('disabled', false).addClass('enabled').css('cursor','pointer');
      } else {
        $checkBtn.prop('disabled', true).removeClass('enabled').css('cursor','not-allowed');
      }
    });
  }

  // ==== finishEditMode ====
  function finishEditMode(restoreDraft = false) {
    window.isEditing = false;
    editingMessageId = null;
    window._editingMessageId = null;
    editingLi = null;
    originalText = '';
    $input.off('input.editMode');

    $('.reply-container').hide();
    $('.reply-header, .reply-content').text('');

    $checkBtn.hide().removeClass('enabled').prop('disabled', true);

    // restore send & heart
    const $heartBtn = $('#reaction-heart, .reaction-heart, .reaction-heart-btn').first();
    if ($heartBtn.length) $heartBtn.show();
    if ($sendBtn && $sendBtn.length) $sendBtn.show().prop('disabled', false).css({opacity:1, pointerEvents:'auto'});

    // restore left icons
    $('.upload-images, .sticker-chatfb, .gif-chatfb, .upload-voice').show();

    // restore draft or clear
    $input.val(restoreDraft ? (preEditDraft || '') : '');
    preEditDraft = '';

    if (typeof updateScrollbar === 'function') updateScrollbar();
  }

  // ==== performUpdateEditedMessage ====
  function performUpdateEditedMessage(newText, cb){
  if (!editingMessageId) {
    cb && cb(new Error('no editingMessageId'));
    return;
  }
  // read current message, append edit history, and update
  messages.child(editingMessageId).once('value', function(snap){
    const data = snap.val() || {};
    const prevText = (data.message || originalText || '').toString();
    const edits = data.edits || {};
    const editKey = '' + Date.now();
    edits[editKey] = prevText;

    const payload = { message: newText, edited: true, edits: edits };
    messages.child(editingMessageId).update(payload, function(err){
      if (err) {
        cb && cb(err);
        return;
      }

      // update DOM in-place
      const $li = $(`[data-message-id="${editingMessageId}"]`);
      if ($li.length) {
        if ($li.hasClass('has-reply')) {
          // reply-type message: update only replied-message
          const $target = $li.find('.replied-message').first();
          if ($target.length) $target.text(newText);
        } else {
          // normal message: update message-text
          const $target = $li.find('.message-text').first();
          if ($target.length) $target.text(newText);
        }

        // add edited label if missing
        if ($li.find('.edited-label').length === 0) {
          let $insertBefore = $li.find('.message-container').first();
          if (!$insertBefore.length) {
            $insertBefore = $li.find('.reply-preview').first();
          }
          if ($insertBefore.length) {
            $insertBefore.before('<div class="edited-label" title="Xem chi tiết chỉnh sửa">Đã chỉnh sửa</div>');
          } else {
            $li.prepend('<div class="edited-label" title="Xem chi tiết chỉnh sửa">Đã chỉnh sửa</div>');
          }
          $li.addClass('has-edited');
        }
      }

      // best-effort: remove newly created duplicate messages (if any)
      try {
        const now = Date.now();
        $(`[data-user="${window.currentUser}"]`).each(function(){
          const $this = $(this);
          const id = $this.attr('data-message-id') || $this.data('message-id');
          if (!id || id === editingMessageId) return;
          const ts = parseTsFromId(id);
          if (!ts) return;
          if (Math.abs(now - ts) < 10000) {
            const t = $this.find('.message-text').text().trim();
            if (t === newText) {
              $this.remove();
            }
          }
        });
      } catch(e){ console.warn('remove duplicate failed', e); }

      cb && cb(null);
    });
  });
}


  // ==== events ====

  // check button click -> save edit
  $checkBtn.on('click', function(e){
    e.preventDefault();
    const $btn = $(this);
    if ($btn.prop('disabled')) return;
    const newText = ($input.val() || '').trim();
    if (!newText) return;
    $btn.prop('disabled', true).addClass('processing');
    performUpdateEditedMessage(newText, function(err){
      $btn.prop('disabled', false).removeClass('processing');
      if (err) {
        showToast && showToast('Lưu chỉnh sửa thất bại.');
        console.error(err);
        return;
      }
      finishEditMode(false);
      showToast && showToast('Đã lưu chỉnh sửa.');
    });
  });

  // intercept send button while editing -> prevent push (advise user to use ✔)
  $(document).on('click', '.send-btn, .btn-send, button.send, #sendBtn', function(e){
    if (editingMessageId) {
      e.preventDefault();
      showToast && showToast('Bạn đang ở chế độ chỉnh sửa. Bấm nút ✔ để lưu chỉnh sửa hoặc hủy để quay lại.');
      return;
    }
    // otherwise let other handlers process send as usual
  });

  // cancel edit
  $(document).on('click', '.reply-cancel, .reply-cancel-btn', function(e){
    e.preventDefault();
    finishEditMode(true);
  });

  // Enter key while editing -> trigger update (use keydown to capture before submission)
  $input.off('keydown.editSave').on('keydown.editSave', function(e){
    if ((e.key === 'Enter' || e.keyCode === 13) && !e.shiftKey) {
      if (editingMessageId || $checkBtn.is(':visible')) {
        e.preventDefault();
        const newText = ($input.val() || '').trim();
        if (!newText || newText === (originalText || '').trim()) {
          // nothing changed -> do nothing (or optionally finishEditMode(false))
          return;
        }
        // trigger save
        $checkBtn.trigger('click');
        return;
      }
    }
  });

  // chỗ này là vị trí của child_added và child_changed nhưng bị trùng nên bỏ đi
  
// 🔹 FIX: Đảm bảo tap 1 lần trên di động vẫn mở bottom sheet ngay cả khi bị mã khác e.preventDefault()
(function(){
  // Lắng nghe pointerup ở chế độ capture (ưu tiên cao)
  document.addEventListener('pointerup', function(ev){
    const target = ev.target.closest('.edited-label');
    if (!target) return;

    // Nếu là tap thực (không phải chuột phải hoặc kéo)
    if (ev.pointerType === 'touch' || ev.pointerType === 'pen' || (ev.pointerType === 'mouse' && ev.button === 0)) {
      // Kiểm tra nếu click đã bị chặn → ta tự kích hoạt lại click
      setTimeout(() => {
        const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        target.dispatchEvent(evt);
      }, 0);
    }
  }, { capture: true, passive: true });
})();


// 🔹 Giữ nguyên mã gốc của bạn, nhưng thêm logic phân biệt người gửi / người nhận
$(document).on('click', '.edited-label', function(e){
  e.preventDefault();
  const $li = $(this).closest('li');
  const msgId = $li.attr('data-message-id') || $li.data('message-id');
  if (!msgId) return;

  messages.child(msgId).once('value', function(snap){
    const data = snap.val() || {};
    const edits = data.edits || {};
    const sender = data.user || ''; // người gửi gốc
    const isMine = sender === currentUser; // true nếu là tin của mình
    const keys = Object.keys(edits || {});
    if (!keys.length) {
      showToast && showToast('Không có lịch sử chỉnh sửa.');
      return;
    }
    keys.sort().reverse();

    let html = '';
    keys.forEach((k,i)=>{
      const ts = new Date(parseInt(k, 10));
      const h = ts.getHours().toString().padStart(2, '0');
      const m = ts.getMinutes().toString().padStart(2, '0');
      const d = ts.getDate().toString().padStart(2, '0');
      const mo = (ts.getMonth() + 1).toString().padStart(2, '0');
      const y = ts.getFullYear();
      const timeStr = `${h}h${m} ${d}/${mo}/${y}`;

      // 🔹 phân biệt layout
      const alignClass = isMine ? 'sender' : 'receiver';

      html += `
        <div class="edited-history-row ${alignClass}">
          <div class="edited-time">${timeStr}</div>
          <div class="edited-message-item">${escapeHtml(edits[k])}</div>
        </div>
      `;
    });

    // PC: hiển thị popup
    if (window.innerWidth > 768) {
      $('#editedHistory').empty().append(html);
      $('#editedPopup').show();
    }
    // Mobile: mở bottom sheet
    else {
      $('.bottomSheet-content-edit-history').html(html);
      if (typeof openBottomSheetEditHistory === 'function') {
        openBottomSheetEditHistory();
      }
    }
  });
});





$('#closeEditedPopup').on('click', function(){
  $('#editedPopup').hide();
});
  
  
// Close edited popup when clicking outside it (except clicks on edited-label)
$(document).on('click touchstart', function(e){
  const $popup = $('#editedPopup');
  if (!$popup.length) return;
  if ($popup.is(':visible')) {
    if (!$(e.target).closest('#editedPopup').length && !$(e.target).closest('.edited-label').length) {
      $popup.hide();
    }
  }
});

// optional: ESC to close
$(document).on('keydown', function(e){
  if (e.key === 'Escape' || e.keyCode === 27) {
    $('#editedPopup').hide();
  }
});



$(document).on('click', '.hide-edit-history', function(e){
  e.preventDefault();
  const $li = $(this).closest('li');
  const msgId = $li ? ($li.attr('data-message-id') || $li.data('message-id')) : null;
  $(this).closest('.edit-history').remove();
  if (msgId) setExpandedEditHistory(msgId, false);
});



  // small utility
  function escapeHtml(s){
    if (!s && s !== 0) return '';
    return String(s).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
  }

  // expose start/finish globally so other code calling them continues to work
  window.startEditMessage = startEditMessage;
  window.finishEditMode = finishEditMode;

})(jQuery);


});
  
// 👉 Thêm đoạn này NGAY SAU dấu đóng ở trên
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === "IMG" && e.target.closest('.chat-container')) {
    e.preventDefault(); // ngăn menu mặc định (copy, lưu ảnh...) khi nhấn giữ ảnh
  }
});  
