
    const firebaseConfig = {
  apiKey: "AIzaSyARdq9PV3CHItkiHDTB1vE-Y2PUakPA3CA",
  authDomain: "viag-3739c.firebaseapp.com",
  databaseURL: "https://viag-3739c-default-rtdb.firebaseio.com",
  projectId: "viag-3739c",
  storageBucket: "viag-3739c.firebasestorage.app",
  messagingSenderId: "548621063751",
  appId: "1:548621063751:web:447e7911f454da3e810362"
};

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database();
    const provider = new firebase.auth.GoogleAuthProvider();
   
	
	// Конфигурация Cloudinary (лучше хранить в переменных окружения, но для демо можно здесь)
const CLOUDINARY_CONFIG = {
  cloudName: 'dbjexsgbh',       // замените на ваш
  uploadPreset: 'viagal'    // замените на ваш preset
};

/**
 * Загружает файл на Cloudinary и возвращает URL загруженного изображения.
 * @param {File} file - файл изображения
 * @returns {Promise<string>} - публичный URL изображения
 */
function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', 'viagramka'); // опционально

    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          resolve(data.secure_url); // возвращаем HTTPS ссылку
        } else {
          reject(data.error?.message || 'Ошибка загрузки на Cloudinary');
        }
      })
      .catch(reject);
  });
}
	
	
    // ========== GLOBAL VARIABLES ==========
    let currentUser = null;
    let currentChat = null;
    let currentChatRef = null;
    let selectedPhotos = [];
    const MAX_PHOTOS = 5;
    let contextMenuMessage = null;
    let messageToReply = null;
    let messageToEdit = null;
	let friendsUpdateTimer = null;
let channelsUpdateTimer = null;
let friendsLastUpdate = 0;
let channelsLastUpdate = 0;
    let messageToForward = null;
    let isReplying = false;
	let emojiPickerVisible = false;
    let recentEmojis = [];
    let isEditing = false;
    let autoCorrectEnabled = true;
    let blurTimeout;
    let currentTheme = 'dark';
	let emptyMessage = false;
    let currentColorTheme = 'purple';
    let blockedUsers = {};
    let isChannelsMode = true;
    let showSubscribedOnly = false;
    
    let currentChannelType = 'channel';
    let currentLanguage = 'ru';
    let privacySettings = {
        emailVisibility: 'nobody',
        onlineVisibility: 'all',
        messagePermissions: 'all',
        mediaPermissions: 'all',
        voicePermissions: 'all'
    };
    let audioRecorder = null;
    let audioChunks = [];
	let videoRecorder = null;
    let videoChunks = [];
    let isRecordingVideo = false;
    const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB максимальный размер видео
    let isRecording = false;

    // NEW: Variables for comments
    let currentCommentMessage = null;           // сообщение (пост), к которому пишут комментарии
    let replyToComment = null;                  // комментарий, на который отвечаем
    let currentCommentsListener = null;          // для отслеживания комментариев в реальном времени

    const DEFAULT_AVATAR = "https://s10.iimage.su/s/24/th_gBLEtZ0xmRHICa1VWted3qYVAkGVWCX9Vkzypewdi.png";
    
const emojiCategories = {
    '😊 Смайлики': ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠'],
    '❤️ Сердечки': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','🚭','❗','❕','❓','❔','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯️','💹','❇️','✳️','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','⚧','🚻','🚮','🎦','📶','🈁','🔣','ℹ️','🔤','🔡','🔠','🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','🔢','#️⃣','*️⃣','⏏️','▶️','⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️','🔼','🔽','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','↪️','↩️','⤴️','⤵️','🔀','🔁','🔂','🔄','🔃','🎵','🎶','➕','➖','➗','✖️','♾️','💲','💱','™️','©️','®️','〰️','➰','➿','🔚','🔙','🔛','🔝','🔜','✔️','☑️','🔘','⚪','⚫','🔴','🔵','🔸','🔹','🔶','🔷','🔺','▪️','▫️','⬛','⬜','🔻','◼️','◻️','◾','◽'],
    '🐱 Животные': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🐜','🦟','🦗','🕷️','🕸️','🦂','🐢','🐍','🦎','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔','🐾'],
    '🍔 Еда': ['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','☕','🫖','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🥣','🍽️'],
    '🎮 Активности': ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽','🛹','🛼','🛷','⛸️','🥌','🎿','⛷️','🏂','🪂','🏋️','🤼','🤸','🤺','⛹️','🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🏵️','🎗️','🎫','🎟️','🎪','🤹','🎭','🩰','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🪕','🎻','🎲','♟️','🎯','🎳','🎮','🎰','🧩'],
    '🚗 Путешествия': ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🦯','🦽','🦼','🛴','🚲','🛵','🏍️','🛺','🚨','🚔','🚍','🚘','🚖','🚡','🚠','🚟','🚃','🚋','🚞','🚝','🚄','🚅','🚈','🚂','🚆','🚇','🚊','🚉','✈️','🛫','🛬','🛩️','💺','🛰️','🚀','🛸','🚁','🛶','⛵','🚤','🛥️','🛳️','⛴️','🚢','⚓','🪝','⛽','🚧','🚦','🚥','🚏','🗺️','🗿','🗽','🗼','🏰','🏯','🏟️','🎡','🎢','🎠','⛲','⛱️','🏖️','🏝️','🏜️','🌋','⛰️','🏔️','🗻','🏕️','⛺','🛖','🏠','🏡','🏘️','🏚️','🏗️','🏭','🏢','🏬','🏣','🏤','🏥','🏦','🏨','🏪','🏫','🏩','💒','🏛️','⛪','🕍','🕋','🛕','🕍','⛩️','🕹️','🎰','🗼']
};
    // ========== DOM ELEMENTS ==========
    const channelSettingsAvatarPreview = document.getElementById('channelSettingsAvatarPreview');
    const channelSettingsAvatarUpload = document.getElementById('channelSettingsAvatarUpload');
    const urlParams = new URLSearchParams(window.location.search);
    const chatIdFromUrl = urlParams.get('id');
    const authModal = document.getElementById('authModal');
    const registerModal = document.getElementById('registerModal');
    const authError = document.getElementById('authError');
    const registerError = document.getElementById('registerError');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const sendSound = document.getElementById('sendSound');
    const receiveSound = document.getElementById('receiveSound');
    const regNickname = document.getElementById('regNickname');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');
    const userAvatar = document.getElementById('userAvatar');
    const friendsList = document.getElementById('friendsList');
    const channelsList = document.getElementById('channelsList');
    const searchInput = document.getElementById('searchInput');
    const friendsSection = document.getElementById('friendsSection');
	const FRIENDS_UPDATE_DELAY = 1000; 
    const CHANNELS_UPDATE_DELAY = 3000;
	 const searchSection = document.getElementById('searchSection');
    const channelsSection = document.getElementById('channelsSection');
    const addFriendBtn = document.getElementById('addFriendBtn');
    const createChannelBtn = document.getElementById('createChannelBtn');
    
    const channelsTitle = document.getElementById('channelsTitle');
    const backToChats = document.getElementById('backToChats');
    const chatAvatar = document.getElementById('chatAvatar');
    const chatName = document.getElementById('chatName');
    const chatStatus = document.getElementById('chatStatus');
    const chatStatusDot = document.getElementById('chatStatusDot');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const attachBtn = document.getElementById('attachBtn');
    const voiceMessageBtn = document.getElementById('voiceMessageBtn'); // убедитесь, что есть в HTML
    const chatInfoBtn = document.getElementById('chatInfoBtn');
    const photoInput = document.getElementById('photoInput');
    const photoPreviewContainer = document.getElementById('photoPreviewContainer');
    const photosInnerContainer = document.getElementById('photosInnerContainer');
    const replyContainer = document.getElementById('replyContainer');
    const editContainer = document.getElementById('editContainer');
    const settingsModal = document.getElementById('settingsModal');
    const profileModal = document.getElementById('profileModal');
    const appearanceSettingsModal = document.getElementById('appearanceSettingsModal');
    const privacySettingsModal = document.getElementById('privacySettingsModal');
    const languageSettingsModal = document.getElementById('languageSettingsModal');
    const systemSettingsModal = document.getElementById('systemSettingsModal');
    const addFriendModal = document.getElementById('addFriendModal');
    const createChannelModal = document.getElementById('createChannelModal');
    const forwardModal = document.getElementById('forwardModal');
    const chatInfoModal = document.getElementById('chatInfoModal');
    const channelSettingsModal = document.getElementById('channelSettingsModal');
    const confirmModal = document.getElementById('confirmModal');
    const lockModal = document.getElementById('lockModal');
	const alertModal = document.getElementById('alert');
	const callOfflineModal = document.getElementById('callOfflineModal');
	const callModal = document.getElementById('callModal');
	const callStatus = document.getElementById('callStatus');
	const callUsername = document.getElementById('callUsername');
    const updatesModal = document.getElementById('updatesModal');
    const groupInviteModal = document.getElementById('groupInviteModal');
    const themeToggle = document.getElementById('themeToggle');
    const themeOptions = document.querySelectorAll('.theme-dot');
    const textSizeSlider = document.getElementById('textSizeSlider');
    const messageTextSizeSlider = document.getElementById('messageTextSizeSlider');
    const messageRadiusSlider = document.getElementById('messageRadiusSlider');
    const emailVisibility = document.getElementById('emailVisibility');
    const onlineVisibility = document.getElementById('onlineVisibility');
    const profileAvatarPreview = document.getElementById('profileAvatarPreview');
    const profileNickname = document.getElementById('profileNickname');
    const profileDescription = document.getElementById('profileDescription');
    const profileError = document.getElementById('profileError');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    const addFriendInput = document.getElementById('addFriendInput');
    const addFriendError = document.getElementById('addFriendError');
    const confirmAddFriendBtn = document.getElementById('confirmAddFriendBtn');
    const cancelAddFriendBtn = document.getElementById('cancelAddFriendBtn');
    const inviteLinkBtn = document.getElementById('inviteLinkBtn');
    const createChannelTitle = document.getElementById('createChannelTitle');
    const channelTypeOptions = document.querySelectorAll('.channel-type-option');
    const channelAvatarPreview = document.getElementById('channelAvatarPreview');
    const createChannelInput = document.getElementById('createChannelInput');
    const createChannelDescription = document.getElementById('createChannelDescription');
    const createChannelError = document.getElementById('createChannelError');
    const confirmCreateChannelBtn = document.getElementById('confirmCreateChannelBtn');
    const cancelCreateChannelBtn = document.getElementById('cancelCreateChannelBtn');
    const channelAvatarUpload = document.getElementById('channelAvatarUpload');
    const forwardChatsList = document.getElementById('forwardChatsList');
    const cancelForwardBtn = document.getElementById('cancelForwardBtn');
    const forwardButton = document.getElementById('forwardButton');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const closeAppearanceSettingsBtn = document.getElementById('closeAppearanceSettingsBtn');
    const closePrivacySettingsBtn = document.getElementById('closePrivacySettingsBtn');
    const closeLanguageSettingsBtn = document.getElementById('closeLanguageSettingsBtn');
    const closeSystemSettingsBtn = document.getElementById('closeSystemSettingsBtn');
    const settingsCategories = document.querySelectorAll('[data-category]');
    const serverOffline = document.getElementById('serverOffline');
    const settingsBtn = document.getElementById('settingsBtn');
    const closeUpdatesBtn = document.getElementById('closeUpdatesBtn');
    const channelNameInput = document.getElementById('channelNameInput');
    const channelDescriptionInput = document.getElementById('channelDescriptionInput');
    const channelSettingsError = document.getElementById('channelSettingsError');
    const saveChannelSettingsBtn = document.getElementById('saveChannelSettingsBtn');
    const closeChannelSettingsBtn = document.getElementById('closeChannelSettingsBtn');
    const chatInfoTitle = document.getElementById('chatInfoTitle');
    const chatInfoContent = document.getElementById('chatInfoContent');
    const closeChatInfoBtn = document.getElementById('closeChatInfoBtn');
    const confirmTitle = document.getElementById('confirmTitle');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmOkBtn = document.getElementById('confirmOkBtn');
    const confirmCancelBtn = document.getElementById('confirmCancelBtn');
    const closeLockModalBtn = document.getElementById('closeLockModalBtn');
    const groupInviteLink = document.getElementById('groupInviteLink');
    const copyGroupInviteBtn = document.getElementById('copyGroupInviteBtn');
    const closeGroupInviteBtn = document.getElementById('closeGroupInviteBtn');
    const autoCorrectToggle = document.getElementById('autoCorrectToggle');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const audioPlayer = document.getElementById('audioPlayer');

    // NEW: Comments modal elements
    const commentsModal = document.getElementById('commentsModal');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    const sendCommentBtn = document.getElementById('sendCommentBtn');
    const closeCommentsBtn = document.getElementById('closeCommentsBtn');
    const commentsModalTitle = document.getElementById('commentsModalTitle');
    const replyToCommentContainer = document.getElementById('replyToCommentContainer');
    const replyToCommentName = document.getElementById('replyToCommentName');
    const replyToCommentText = document.getElementById('replyToCommentText');
	const VERIFIED_USERS = [
        'admin@example.com',
        'moderator@example.com',
        // Добавьте сюда email верифицированных пользователей
    ];   

    // ========== ФОРМАТИРОВАНИЕ ТЕКСТА ==========
    const formatToolbar = document.getElementById('formatToolbar');
    const IMAGEKIT_PUBLIC_KEY = 'public_qRBbAne/WQQzq8ogy0cQrPRb4kE='; // из настроек ImageKit
    const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/r8xgskt4t';
    const SIGNATURE_ENDPOINT = 'https://your-cloud-function-url/generateImageKitSignature';

async function uploadToImageKit(file) {
  try {
    // 1. Получаем подпись
    const sigRes = await fetch(SIGNATURE_ENDPOINT);
    if (!sigRes.ok) throw new Error('Не удалось получить подпись');
    const { token, expire, signature } = await sigRes.json();

    // 2. Загружаем файл
    const formData = new FormData();
    formData.append('file', file);
    formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
    formData.append('token', token);
    formData.append('expire', expire);
    formData.append('signature', signature);
    formData.append('folder', 'viagramka'); // опционально

    const uploadRes = await fetch(`https://upload.imagekit.io/api/v1/files/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await uploadRes.json();
    if (data.url) {
	  showNotification("ой", error);
      return; // Прямая ссылка на изображение
    } else {
      throw new Error(data.message || 'Ошибка загрузки');
    }
  } catch (err) {
    console.error('ImageKit upload error:', err);
    throw err;
  }
}
    // Функция для оборачивания выделенного текста символами
    function wrapSelection(textarea, before, after) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const newText = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);
        textarea.value = newText;
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = end + before.length;
        textarea.focus();
        resizeTextarea();
    }

    // Парсинг Markdown-подобной разметки в безопасный HTML
    function parseMarkdown(text) {
        if (!text) return '';
        // Экранируем все HTML-сущности, чтобы избежать XSS
        let escaped = text.replace(/[&<>"]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            if (m === '"') return '&quot;';
            return m;
        });

        // Порядок важен: сначала более длинные, потом короткие
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        escaped = escaped.replace(/__(.*?)__/g, '<u>$1</u>');
        escaped = escaped.replace(/~~(.*?)~~/g, '<del>$1</del>');
        escaped = escaped.replace(/_([^_]+)_/g, '<i>$1</i>');
        escaped = escaped.replace(/`(.*?)`/g, '<code>$1</code>');

        return escaped;
    }

    // Обработчики кнопок форматирования
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const format = btn.dataset.format;
            const textarea = messageInput;
            if (!textarea) return;

            let before = '', after = '';
            switch (format) {
                case 'bold': before = '**'; after = '**'; break;
                case 'italic': before = '_'; after = '_'; break;
                case 'underline': before = '__'; after = '__'; break;
                case 'strikethrough': before = '~~'; after = '~~'; break;
                case 'code': before = '`'; after = '`'; break;
                default: return;
            }
            wrapSelection(textarea, before, after);
        });
    });
	async function linkToGoogle() {
    if (!currentUser) {
        showNotification("Сначала войдите в систему", "error");
        return;
    }

    try {
        showNotification("Привязка к Google...", "info");
        
        // Получаем текущего пользователя из Firebase Auth
        const firebaseUser = auth.currentUser;
        
        if (!firebaseUser) {
            showNotification("Ошибка аутентификации", "error");
            return;
        }
        
        // Привязываем Google аккаунт
        await firebaseUser.linkWithPopup(provider);
        
        showNotification("Аккаунт успешно привязан к Google!", "success");
        
    } catch (error) {
        console.error("Ошибка привязки к Google:", error);
        
        // Обрабатываем ошибки
        switch (error.code) {
            case 'auth/credential-already-in-use':
                showNotification("Этот Google-аккаунт уже используется", "error");
                break;
            case 'auth/popup-closed-by-user':
                showNotification("Окно авторизации было закрыто", "warning");
                break;
            case 'auth/popup-blocked':
                showNotification("Всплывающее окно заблокировано браузером", "error");
                break;
            case 'auth/provider-already-linked':
                showNotification("Google аккаунт уже привязан", "warning");
                break;
            default:
                showNotification(`Ошибка: ${error.message}`, "error");
        }
    }
}

async function linkWithGoogle() {
    if (!currentUser) {
        showNotification("Сначала войдите в систему", "error");
        return;
    }

    try {
        showNotification("Привязка к Google...", "info");
        
        // Получаем текущего пользователя из Firebase Auth (не из нашего currentUser)
        const firebaseUser = auth.currentUser;
        
        if (!firebaseUser) {
            showNotification("Ошибка аутентификации", "error");
            return;
        }
        
        // Пытаемся привязать аккаунт Google
        const result = await firebaseUser.linkWithPopup(provider);
        
        // Получаем данные от Google
        const credential = firebase.auth.GoogleAuthProvider.credentialFromResult(result);
        const googleUser = result.user;
        
        // Находим провайдер Google в списке провайдеров
        const googleProviderData = googleUser.providerData.find(
            p => p.providerId === 'google.com'
        );
        
        // Сохраняем информацию о привязке в базу данных
        await db.ref(`users/${currentUser.uid}/linkedAccounts`).update({
            google: {
                email: googleProviderData?.email || googleUser.email,
                displayName: googleProviderData?.displayName || googleUser.displayName,
                photoURL: googleProviderData?.photoURL || googleUser.photoURL,
                linkedAt: Date.now(),
                uid: googleProviderData?.uid || googleUser.uid
            }
        });
        
        showNotification("Аккаунт успешно привязан к Google!", "success");
        
        // Обновляем профиль, если нужно
        await checkAndUpdateProfileFromGoogle(googleProviderData);
        
        // Обновляем UI
        await updateLinkedAccountsUI();
        
    } catch (error) {
        console.error("Ошибка привязки к Google:", error);
        
        // Обрабатываем специфичные ошибки
        switch (error.code) {
            case 'auth/credential-already-in-use':
                showNotification("Этот Google-аккаунт уже используется другим пользователем", "error");
                break;
            case 'auth/email-already-in-use':
                showNotification("Этот email уже зарегистрирован", "error");
                break;
            case 'auth/popup-closed-by-user':
                showNotification("Окно авторизации было закрыто", "warning");
                break;
            case 'auth/popup-blocked':
                showNotification("Всплывающее окно заблокировано браузером", "error");
                break;
            case 'auth/provider-already-linked':
                showNotification("Google аккаунт уже привязан к этому пользователю", "warning");
                break;
            default:
                showNotification(`Ошибка: ${error.message}`, "error");
        }
    }
}

// Функция для отвязки аккаунта от Google
async function unlinkGoogle() {
    if (!currentUser) {
        showNotification("Сначала войдите в систему", "error");
        return;
    }

    try {
        // Показываем подтверждение
        showConfirm(
            "Отвязка аккаунта Google",
            "Вы уверены, что хотите отвязать Google-аккаунт? Вы сможете привязать его позже.",
            async () => {
                const firebaseUser = auth.currentUser;
                
                if (!firebaseUser) {
                    showNotification("Ошибка аутентификации", "error");
                    return;
                }
                
                // Отвязываем провайдер
                await firebaseUser.unlink('google.com');
                
                // Удаляем информацию из базы данных
                await db.ref(`users/${currentUser.uid}/linkedAccounts/google`).remove();
                
                showNotification("Google-аккаунт успешно отвязан", "success");
                
                // Обновляем интерфейс
                await updateLinkedAccountsUI();
            }
        );
    } catch (error) {
        console.error("Ошибка отвязки Google:", error);
        showNotification(`Ошибка: ${error.message}`, "error");
    }
}

// Функция для проверки и обновления профиля из Google
async function checkAndUpdateProfileFromGoogle(googleProviderData) {
    if (!currentUser || !googleProviderData) return;
    
    try {
        // Проверяем, нужно ли обновить аватарку
        const userData = (await db.ref(`users/${currentUser.uid}`).once('value')).val();
        
        const updates = {};
        
        // Если у пользователя нет аватарки или она дефолтная, используем аватарку из Google
        if ((!userData.avatar || userData.avatar === DEFAULT_AVATAR) && googleProviderData.photoURL) {
            updates.avatar = googleProviderData.photoURL;
            currentUser.avatar = googleProviderData.photoURL;
            userAvatar.src = googleProviderData.photoURL;
        }
        
        // Если нет ника, используем имя из Google
        if ((!userData.nickname || userData.nickname === "Пользователь") && googleProviderData.displayName) {
            updates.nickname = googleProviderData.displayName;
            currentUser.nickname = googleProviderData.displayName;
        }
        
        // Применяем обновления
        if (Object.keys(updates).length > 0) {
            await db.ref(`users/${currentUser.uid}`).update(updates);
        }
    } catch (error) {
        console.error("Ошибка обновления профиля из Google:", error);
    }
}

// Функция для получения статуса привязки к Google
async function getGoogleLinkStatus() {
    if (!currentUser) return false;
    
    try {
        const firebaseUser = auth.currentUser;
        
        if (!firebaseUser) return false;
        
        // Проверяем провайдеры
        const providerData = firebaseUser.providerData || [];
        const hasGoogle = providerData.some(provider => provider.providerId === 'google.com');
        
        // Также проверяем в базе данных
        const linkedAccounts = await db.ref(`users/${currentUser.uid}/linkedAccounts`).once('value');
        const linkedData = linkedAccounts.val();
        
        return hasGoogle || (linkedData && linkedData.google);
    } catch (error) {
        console.error("Ошибка проверки статуса Google:", error);
        return false;
    }
}

// Функция для обновления UI с информацией о привязанных аккаунтах
async function updateLinkedAccountsUI() {
    if (!currentUser) return;
    
    const isLinked = await getGoogleLinkStatus();
    
    // Обновляем существующую секцию или создаем новую
    let linkedAccountsSection = document.getElementById('linkedAccountsSection');
    
    if (!linkedAccountsSection) {
        // Создаем секцию в модальном окне профиля
        const profileModalContent = document.querySelector('#profileModal .modal-content');
        if (profileModalContent) {
            linkedAccountsSection = document.createElement('div');
            linkedAccountsSection.id = 'linkedAccountsSection';
            linkedAccountsSection.className = 'settings-list';
            linkedAccountsSection.style.marginTop = '20px';
            linkedAccountsSection.style.paddingTop = '20px';
            linkedAccountsSection.style.borderTop = '1px solid var(--border)';
            
            linkedAccountsSection.innerHTML = `
                <h3 style="margin-bottom: 15px; color: var(--text-secondary);">Привязанные аккаунты</h3>
                <div class="settings-item" style="justify-content: flex-start; gap: 12px;">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 24px; height: 24px;">
                    <span>Google</span>
                    <span style="margin-left: auto; color: var(--text-secondary);" id="googleLinkStatus">${isLinked ? '✓ Привязан' : '✗ Не привязан'}</span>
                </div>
                <div class="flex gap-8 mt-16" id="googleLinkActions">
                    ${isLinked ?
                        `<h1>Вы привязали ваш аккаунт к Google</h1>` :
                        `<button class="modal-btn primary" onclick="linkToGoogle()" style="flex: 1;">Привязать Google</button>`
                    }
                </div>
            `;
            
            // Вставляем перед кнопками
            const saveBtn = document.getElementById('saveProfileBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            if (saveBtn && logoutBtn) {
                profileModalContent.insertBefore(linkedAccountsSection, saveBtn);
            }
        }
    } else {
        // Обновляем существующую секцию
        const statusEl = document.getElementById('googleLinkStatus');
        if (statusEl) {
            statusEl.textContent = isLinked ? '✓ Привязан' : '✗ Не привязан';
            statusEl.style.color = isLinked ? '#4CAF50' : '#F44336';
        }
        
        const actionsEl = document.getElementById('googleLinkActions');
        if (actionsEl) {
            actionsEl.innerHTML = isLinked ?
                `<h1>АККАУНТ ПРИВЯЗАН К ГУГЛ</h1>` :
                `<button class="modal-btn primary" onclick="linkToGoogle()" style="flex: 1;">Привязать Google</button>`;
        }
    }
}

// Улучшенная функция входа через Google
async function signInWithGoogle(isRegistration = false) {
    try {
        const result = await auth.signInWithRedirect(provider);
        const user = result.user;
        
        // Проверяем, существует ли пользователь в базе
        const snap = await db.ref("users/" + user.uid).once("value");
        
        if (!snap.exists()) {
            // Новый пользователь - создаем запись
            const googleProviderData = user.providerData.find(
                p => p.providerId === 'google.com'
            );
            
            await db.ref("users/" + user.uid).set({
                nickname: user.displayName || "Пользователь",
                avatar: user.photoURL || DEFAULT_AVATAR,
                description: "Привет! я использую Viagram!",
                online: true,
                linkedAccounts: {
                    google: {
                        email: googleProviderData?.email || user.email,
                        displayName: googleProviderData?.displayName || user.displayName,
                        photoURL: googleProviderData?.photoURL || user.photoURL,
                        linkedAt: Date.now(),
                        uid: googleProviderData?.uid || user.uid
                    }
                }
            });
        } else {
            // Существующий пользователь - обновляем информацию о привязке
            const googleProviderData = user.providerData.find(
                p => p.providerId === 'google.com'
            );
            
            await db.ref(`users/${user.uid}/linkedAccounts`).update({
                google: {
                    email: googleProviderData?.email || user.email,
                    displayName: googleProviderData?.displayName || user.displayName,
                    photoURL: googleProviderData?.photoURL || user.photoURL,
                    linkedAt: Date.now(),
                    uid: googleProviderData?.uid || user.uid
                }
            });
            
            // Проверяем и обновляем профиль
            await checkAndUpdateProfileFromGoogle(googleProviderData);
        }
        
        if (isRegistration) {
            hideModal(registerModal);
        } else {
            hideModal(authModal);
        }
        
        showNotification("Успешный вход через Google!", "success");
        
    } catch (error) {
        console.error("Ошибка входа через Google:", error);
        
        let errorMessage = "Ошибка входа через Google";
        
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = "Окно авторизации было закрыто";
                break;
            case 'auth/popup-blocked':
                errorMessage = "Всплывающее окно заблокировано браузером";
                break;
            case 'auth/cancelled-popup-request':
                errorMessage = "Запрос авторизации отменен";
                break;
            default:
                errorMessage = error.message;
        }
        
        if (isRegistration) {
            registerError.textContent = errorMessage;
        } else {
            authError.textContent = errorMessage;
        }
        
        showNotification(`Ошибка: ${errorMessage}`, "error");
    }
}

// Обновляем обработчики для кнопок Google
document.addEventListener('DOMContentLoaded', function() {
    // Заменяем существующие обработчики
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');
    
    if (googleLoginBtn) {
        // Удаляем старый обработчик
        googleLoginBtn.removeEventListener('click', googleLoginBtn._listener);
        // Добавляем новый
        googleLoginBtn._listener = () => signInWithGoogle(false);
        googleLoginBtn.addEventListener('click', googleLoginBtn._listener);
    }
    
    if (googleRegisterBtn) {
        // Удаляем старый обработчик
        googleRegisterBtn.removeEventListener('click', googleRegisterBtn._listener);
        // Добавляем новый
        googleRegisterBtn._listener = () => signInWithGoogle(true);
        googleRegisterBtn.addEventListener('click', googleRegisterBtn._listener);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const chatAvatar = document.getElementById('chatAvatar');
    if (chatAvatar) {
        chatAvatar.style.cursor = 'pointer';
        chatAvatar.addEventListener('click', function() {
            if (currentChat && currentChat.type === 'friend') {
                showOtherUserInfo(currentChat.id);
            } else if (currentChat) {
                showChatInfo();
            }
        });
    }
});

// Добавляем наблюдатель за модальным окном профиля
function initProfileModalObserver() {
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (profileModal.classList.contains('active')) {
                    // Даем время на загрузку данных
                    setTimeout(() => {
                        updateLinkedAccountsUI();
                    }, 500);
                }
            }
        });
    });
    
    observer.observe(profileModal, { attributes: true });
}


initProfileModalObserver();


const originalShowProfile = window.showProfile;
window.showProfile = function() {
    if (originalShowProfile) originalShowProfile();
    setTimeout(() => updateLinkedAccountsUI(), 500);
};

// Функция для проверки и обновления профиля из Google
async function checkAndUpdateProfileFromGoogle(googleUser) {
    if (!currentUser) return;
    
    // Проверяем, нужно ли обновить аватарку
    const userData = (await db.ref(`users/${currentUser.uid}`).once('value')).val();
    
    // Если у пользователя нет аватарки или она дефолтная, используем аватарку из Google
    if ((!userData.avatar || userData.avatar === DEFAULT_AVATAR) && googleUser.photoURL) {
        await db.ref(`users/${currentUser.uid}`).update({
            avatar: googleUser.photoURL
        });
        currentUser.avatar = googleUser.photoURL;
        userAvatar.src = googleUser.photoURL;
    }
}

// Функция для получения статуса привязки к Google
async function getGoogleLinkStatus() {
    if (!currentUser) return false;
    
    try {
        const user = auth.currentUser;
        const providerData = user.providerData || [];
        return providerData.some(provider => provider.providerId === 'google.com');
    } catch (error) {
        console.error("Ошибка проверки статуса Google:", error);
        return false;
    }
}

// Функция для обновления UI с информацией о привязанных аккаунтах
async function updateLinkedAccountsUI() {
    if (!currentUser) return;
    
    const isLinked = await getGoogleLinkStatus();
    
    // Ищем или создаем секцию в профиле для отображения привязанных аккаунтов
    let linkedAccountsSection = document.getElementById('linkedAccountsSection');
    
    if (!linkedAccountsSection) {
        // Создаем секцию в модальном окне профиля
        const profileModalContent = document.querySelector('#profileModal .modal-content');
        if (profileModalContent) {
            linkedAccountsSection = document.createElement('div');
            linkedAccountsSection.id = 'linkedAccountsSection';
            linkedAccountsSection.className = 'settings-list mt-16';
            linkedAccountsSection.innerHTML = `
                <h3 class="text-secondary" style="margin-bottom: 10px;">Привязанные аккаунты</h3>
                <div class="settings-item">
                    <div class="settings-item-left">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width:24px; height:24px;">
                        <span class="settings-label">Google</span>
                    </div>
                    <div class="linked-status" id="googleLinkStatus">
                        ${isLinked ? 
                            '<span class="settings-value" style="color: #4CAF50;">✓ Привязан</span>' : 
                            '<span class="settings-value" style="color: #F44336;">✗ Не привязан</span>'
                        }
                    </div>
                </div>
                <div class="flex gap-8 mt-16" id="googleLinkActions">
                    ${isLinked ?
                        `<button class="modal-btn secondary">Вы привязали аккаунт к аккаунту Google. Теперь всё будет в порядке!</button>` :
                        `<button class="modal-btn primary" onclick="linkWithGoogle()">Привязать Google</button>`
                    }
                </div>
            `;
            
            // Вставляем перед кнопками
            const saveBtn = document.getElementById('saveProfileBtn');
            if (saveBtn) {
                profileModalContent.insertBefore(linkedAccountsSection, saveBtn);
            }
        }
    } else {
        // Обновляем существующую секцию
        const statusEl = document.getElementById('googleLinkStatus');
        if (statusEl) {
            statusEl.innerHTML = isLinked ? 
                '<span class="settings-value" style="color: #4CAF50;">✓ Привязан</span>' : 
                '<span class="settings-value" style="color: #F44336;">✗ Не привязан</span>';
        }
        
        const actionsEl = document.getElementById('googleLinkActions');
        if (actionsEl) {
            actionsEl.innerHTML = isLinked ?
                `<button class="modal-btn secondary">Google привязан к вашему аккаунту! Теперь аккаунт в безопасности.</button>` :
                `<button class="modal-btn primary" onclick="linkWithGoogle()">Привязать Google</button>`;
        }
    }
}
function updateFriendsListWithDelay(snapshot) {
    const now = Date.now();
    
    // Если прошло меньше 1 секунды с последнего обновления, откладываем
    if (now - friendsLastUpdate < FRIENDS_UPDATE_DELAY) {
        // Очищаем предыдущий таймер
        if (friendsUpdateTimer) {
            clearTimeout(friendsUpdateTimer);
        }
        
        // Устанавливаем новый таймер
        friendsUpdateTimer = setTimeout(() => {
            processFriendsUpdate(snapshot);
            friendsLastUpdate = Date.now();
            friendsUpdateTimer = null;
        }, FRIENDS_UPDATE_DELAY - (now - friendsLastUpdate));
        
        return;
    }
    
    // Если прошло достаточно времени, обновляем сразу
    processFriendsUpdate(snapshot);
    friendsLastUpdate = now;
}

// Функция для обновления списка каналов с задержкой
function updateChannelsListWithDelay(snapshot) {
    const now = Date.now();
    
    // Если прошло меньше 3 секунд с последнего обновления, откладываем
    if (now - channelsLastUpdate < CHANNELS_UPDATE_DELAY) {
        // Очищаем предыдущий таймер
        if (channelsUpdateTimer) {
            clearTimeout(channelsUpdateTimer);
        }
        
        // Устанавливаем новый таймер
        channelsUpdateTimer = setTimeout(() => {
            processChannelsUpdate(snapshot);
            channelsLastUpdate = Date.now();
            channelsUpdateTimer = null;
        }, CHANNELS_UPDATE_DELAY - (now - channelsLastUpdate));
        
        return;
    }
    
    // Если прошло достаточно времени, обновляем сразу
    processChannelsUpdate(snapshot);
    channelsLastUpdate = now;
}

function processFriendsUpdate(snapshot) {
    if (!currentUser || !friendsList) return;
    
    const friends = snapshot.val() || {};
    const friendIds = Object.keys(friends);

    if (friendIds.length === 0) {
        friendsList.innerHTML = '<div class="empty-state">У вас пока нет друзей</div>';
        return;
    }

    // Показываем индикатор загрузки
    friendsList.innerHTML = '<div class="loading"><div class="spinner"></div> Загрузка друзей...</div>';

    const fragment = document.createDocumentFragment();
    let loaded = 0;
    let successfulLoads = 0;
    let failedLoads = 0;

    // Загружаем каждого друга
    friendIds.forEach(friendId => {
        db.ref("users/" + friendId).once("value").then(userSnap => {
            const user = userSnap.val();
            
            // Проверяем, что пользователь существует и имеет никнейм
            if (user && user.nickname) {
                const div = document.createElement('div');
                div.className = 'chat-item';
                div.dataset.type = 'friend';
                div.dataset.id = friendId;

                

                div.innerHTML = `
                    <div class="chat-avatar">
                        <img src="${user.avatar || DEFAULT_AVATAR}" alt="">
                        <span class="online-status" style="background: ${user.online ? '#4CAF50' : '#757575'}"></span>
                    </div>
                    <div class="chat-info">
                        <div class="chat-name">
                            ${sanitize(user.nickname)}
                            
                        </div>
                    </div>
                `;

                div.onclick = () => openChat('friend', friendId, user.nickname, user.avatar);
                fragment.appendChild(div);
                successfulLoads++;
            } else {
                console.log("Друг не имеет данных или никнейма:", friendId);
                failedLoads++;
            }
            
            loaded++;
            checkIfAllFriendsLoaded(loaded, friendIds.length, fragment, successfulLoads, failedLoads);
            
        }).catch(error => {
            console.error("Ошибка загрузки друга:", friendId, error);
            failedLoads++;
            loaded++;
            checkIfAllFriendsLoaded(loaded, friendIds.length, fragment, successfulLoads, failedLoads);
        });
    });
}

function processChannelsUpdate(snapshot) {
    if (!currentUser || !channelsList) return;

    channelsList.innerHTML = '<div class="loading"><div class="spinner"></div> Загрузка каналов...</div>';

    const channels = snapshot.val() || {};
    const fragment = document.createDocumentFragment();
    let hasItems = false;
    let processedCount = 0;
    const channelIds = Object.keys(channels);

    if (channelIds.length === 0) {
        channelsList.innerHTML = '<div class="empty-state">Нет доступных каналов</div>';
        return;
    }

    channelIds.forEach(([channelId, channel]) => {
        // Определяем, канал это или группа
        const isChannel = channel.type === 'channel' || !channel.type;
        const isGroup = channel.type === 'group';
        
        // Фильтруем в зависимости от режима
        if (isChannelsMode && isGroup) {
            processedCount++;
            checkIfAllChannelsLoaded(processedCount, channelIds.length, fragment, hasItems);
            return;
        }
        if (!isChannelsMode && !isGroup) {
            processedCount++;
            checkIfAllChannelsLoaded(processedCount, channelIds.length, fragment, hasItems);
            return;
        }
        
        // Фильтр по подпискам
        if (showSubscribedOnly && !channel.members?.[currentUser.uid]) {
            processedCount++;
            checkIfAllChannelsLoaded(processedCount, channelIds.length, fragment, hasItems);
            return;
        }

        const isMember = channel.members && channel.members[currentUser.uid];
        const subscribers = channel.members ? Object.keys(channel.members).length : 0;

        // Получаем уровень верификации
        const verificationLevel = getUserVerificationStatus({ 
            uid: channelId, 
            email: channel.email 
        });
        const badge = getVerificationBadge(verificationLevel);

        const div = document.createElement('div');
        div.className = 'chat-item';
        div.dataset.type = 'channel';
        div.dataset.id = channelId;

        div.innerHTML = `
            <div class="chat-avatar">
                <img src="${channel.avatar || DEFAULT_AVATAR}" alt="">
                ${isMember ? '<span class="online-status" style="background: #4CAF50"></span>' : ''}
            </div>
            <div class="chat-info">
                <div class="chat-name">
                    ${sanitize(channel.name || 'Без названия')}
                    ${badge}
                </div>
                <div class="text-tertiary">${subscribers} ${isGroup ? 'участников' : 'подписчиков'}</div>
            </div>
        `;

        div.onclick = () => openChat('channel', channelId, channel.name || 'Канал', channel.avatar);
        fragment.appendChild(div);
        hasItems = true;
        
        processedCount++;
        checkIfAllChannelsLoaded(processedCount, channelIds.length, fragment, hasItems);
    });
}
// Модифицируем функцию входа через Google для поддержки привязки
async function signInWithGoogle(isRegistration = false) {
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Проверяем, существует ли пользователь в базе
        const snap = await db.ref("users/" + user.uid).once("value");
        
        if (!snap.exists()) {
            // Новый пользователь - создаем запись
            await db.ref("users/" + user.uid).set({
                nickname: user.displayName || "Пользователь",
                avatar: user.photoURL || DEFAULT_AVATAR,
                description: "Привет! я использую Viagram!",
                online: true,
                linkedAccounts: {
                    google: {
                        email: user.email,
                        displayName: user.displayName,
                        linkedAt: Date.now()
                    }
                }
            });
        } else {
            // Существующий пользователь - обновляем информацию о привязке
            await db.ref(`users/${user.uid}/linkedAccounts`).update({
                google: {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    linkedAt: Date.now()
                }
            });
        }
        
        if (isRegistration) {
            hideModal(registerModal);
        } else {
            hideModal(authModal);
        }
        
        showNotification("Успешный вход через Google!", "success");
        
    } catch (error) {
        console.error("Ошибка входа через Google:", error);
        
        if (isRegistration) {
            registerError.textContent = error.message;
        } else {
            authError.textContent = error.message;
        }
        
        showNotification(`Ошибка: ${error.message}`, "error");
    }
}

// Обновляем обработчики для кнопок Google
document.addEventListener('DOMContentLoaded', function() {
    // Заменяем существующие обработчики
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');
    
    if (googleLoginBtn) {
        googleLoginBtn.onclick = () => signInWithGoogle(false);
    }
    
    if (googleRegisterBtn) {
        googleRegisterBtn.onclick = () => signInWithGoogle(true);
    }
});

// Добавляем кнопку привязки Google в профиль
function addGoogleLinkButtonToProfile() {
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;
    
    // Добавляем секцию после загрузки профиля
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (profileModal.classList.contains('active')) {
                    updateLinkedAccountsUI();
                }
            }
        });
    });
    
    observer.observe(profileModal, { attributes: true });
}

// Инициализация
addGoogleLinkButtonToProfile();



auth.onAuthStateChanged(async (user) => {
        if (user) {
			
            const snap = await db.ref("users/" + user.uid).once("value");
            const data = snap.val() || {};
            currentUser = {
                uid: user.uid,
                email: user.email,
                nickname: data.nickname || "Пользователь",
                avatar: data.avatar || DEFAULT_AVATAR,
                description: data.description || "Привет! я использую Viagram!"
            };
            const blocked = await db.ref(`blockedUsers/${currentUser.uid}`).once("value");
            blockedUsers = blocked.val() || {};
            userAvatar.src = currentUser.avatar;
            updateOnlineStatus(currentUser.uid, true);
            window.addEventListener("beforeunload", () => updateOnlineStatus(currentUser.uid, false));
            await loadUserSettings(currentUser.uid);
            loadFriends();
            loadChannels();
            hideModal(authModal);
            hideModal(registerModal);
            if (chatIdFromUrl) {
                await openChatFromUrl(chatIdFromUrl);
            }
        } else {
            currentUser = null;
            blockedUsers = {};
            userAvatar.src = DEFAULT_AVATAR;
            friendsList.innerHTML = '';
            channelsList.innerHTML = '';
            chatMessages.innerHTML = '';
            chatName.textContent = "Выберите чат";
            chatAvatar.src = '';
            showModal(authModal);
        }
    });


    // ========== UTILITY FUNCTIONS ==========
    function sanitize(str) {
        if (!str) return "";
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

function formatTime(timestamp) {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Форматируем время (часы:минуты)
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Если сообщение сегодня
    if (messageDate.getTime() === today.getTime()) {
        return `сегодня ${timeStr}`;
    }
    // Если сообщение вчера
    else if (messageDate.getTime() === yesterday.getTime()) {
        return `вчера ${timeStr}`;
    }
    // Если сообщение в этом году
    else if (date.getFullYear() === now.getFullYear()) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month} ${timeStr}`;
    }
    // Если сообщение в прошлом году
    else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year} ${timeStr}`;
    }
}

    function formatDate(timestamp) {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function showModal(modal) {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        modal.classList.add('active');
        if (modal === channelSettingsModal && currentChat && currentChat.type === 'channel') {
            db.ref("channels/" + currentChat.id).once("value").then(snap => {
                const channel = snap.val();
                if (channel) {
                    channelNameInput.value = channel.name || '';
                    channelDescriptionInput.value = channel.description || '';
                    channelSettingsAvatarPreview.src = channel.avatar || DEFAULT_AVATAR;
                }
            });
            channelSettingsAvatarUpload.value = "";
        }
    }

    function hideModal(modal) {
        modal.classList.remove('active');
    }

    function showNotification(message, type = 'info') {
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        let icon = '"M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"';
		let color = 'blue';
        if (type === 'success')
		{
			icon = '"M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"';
			color = 'green';
		}
	
        if (type === 'error')
		{
			icon = '"M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"';
			color = 'red';
		} 
        if (type === 'warning')
		{
			icon = '"m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm330.5-51.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Zm40-100Z"';
			color = 'orange';
		} 

        notification.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=${color}><path d=${icon}/></svg>
            <span class="notification-message">${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 16px;
            left: 16px;
            right: 16px;
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: 14px 16px;
            border-left: 4px solid ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FFC107'};
            display: flex;
            align-items: center;
            z-index: 2000;
            animation: slideDownForNotification 0.3s ease;
            max-width: 400px;
            margin: 0 auto;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.cssText = `
              position: fixed;
              top: 16px;
              left: 16px;
              right: 16px;
              background: var(--bg-secondary);
              border-radius: 16px;
              padding: 14px 16px;
              border-left: 4px solid ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FFC107'};
              display: flex;
              align-items: center;
              z-index: 2000;
              animation: hideNotification 0.3s ease;
              max-width: 400px;
              margin: 0 auto;
            `;
        }, 3000);
		setTimeout(() => {
            notification.remove();
            
        }, 3100);
    }

    function resizeTextarea() {
        if (!messageInput) return;
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
    }

    function scrollToBottom() {
        if (!chatMessages) return;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getChatId(uid1, uid2) {
        return uid1 < uid2 ? uid1 + "_" + uid2 : uid2 + "_" + uid1;
    }

    function updateOnlineStatus(uid, online) {
        if (!uid) return;
        db.ref("users/" + uid).update({ online });
    }

    // ========== THEME FUNCTIONS ==========
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }

function applyColorTheme(colorTheme) {
    document.body.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-red', 'theme-orange');
    document.body.classList.add(`theme-${colorTheme}`);
    currentColorTheme = colorTheme;

    themeOptions.forEach(opt => {
        if (opt.dataset.theme === colorTheme) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });
    
    // Обновляем meta theme-color для PWA
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta');
        themeColorMeta.name = 'theme-color';
        document.head.appendChild(themeColorMeta);
    }
    
    // Получаем цвет в зависимости от темы
    let color = '#6C63FF'; // purple по умолчанию
    switch(colorTheme) {
        case 'blue': color = '#2196F3'; break;
        case 'green': color = '#4CAF50'; break;
        case 'red': color = '#F44336'; break;
        case 'orange': color = '#FF9800'; break;
    }
    themeColorMeta.setAttribute('content', color);
}

    function applyTextSize(size) {
        document.documentElement.style.setProperty('--base-font-size', `${size}px`);
    }

    function applyMessageTextSize(size) {
        const style = document.createElement('style');
        style.id = 'message-text-size';
        style.textContent = `.message { font-size: ${size}px; }`;

        const oldStyle = document.getElementById('message-text-size');
        if (oldStyle) oldStyle.remove();
        document.head.appendChild(style);
    }

    function applyBorderRadius(radius) {
        const style = document.createElement('style');
        style.id = 'message-radius';
        style.textContent = `.message { border-radius: ${radius}px; }`;

        const oldStyle = document.getElementById('message-radius');
        if (oldStyle) oldStyle.remove();
        document.head.appendChild(style);
    }

    function createCheckmarkSVG() {
        return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="lightblue"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>`;
    }

    function loadFriends() {
    if (!currentUser || !friendsList) return;

    // Отключаем старый слушатель если был
    if (window.friendsListener) {
        db.ref("friends/" + currentUser.uid).off('value', window.friendsListener);
    }

    // Создаем новый слушатель с задержкой
    window.friendsListener = db.ref("friends/" + currentUser.uid).on("value", snapshot => {
        updateFriendsListWithDelay(snapshot);
    }, error => {
        friendsList.innerHTML = '<div class="empty-state">Ошибка загрузки</div>';
    });
}

// Обновляем функцию загрузки каналов
function loadChannels() {
    if (!currentUser || !channelsList) return;

    // Отключаем старый слушатель если был
    if (window.channelsListener) {
        db.ref("channels").off('value', window.channelsListener);
    }

    // Создаем новый слушатель с задержкой
    window.channelsListener = db.ref("channels").on("value", snapshot => {
        updateChannelsListWithDelay(snapshot);
    });
}

function forceRefreshLists() {
    // Сбрасываем таймеры
    if (friendsUpdateTimer) {
        clearTimeout(friendsUpdateTimer);
        friendsUpdateTimer = null;
    }
    if (channelsUpdateTimer) {
        clearTimeout(channelsUpdateTimer);
        channelsUpdateTimer = null;
    }
    
    // Сбрасываем время последнего обновления
    friendsLastUpdate = 0;
    channelsLastUpdate = 0;
    
    // Загружаем списки заново
    if (currentUser) {
        loadFriends();
        loadChannels();
    }
    
    showNotification("Списки обновлены", "success");
}
function getVerificationBadge(level) {
    if (level === 1) {
        return '<span class="verified-badge" style="background:#2196F3; color:white; border-radius:50%; width:16px; height:16px; display:inline-flex; align-items:center; justify-content:center; font-size:10px;">✓</span>';
    } else if (level === 2) {
        return '<span class="zgs-badge" style="background:linear-gradient(135deg,#FFD700,#FFA500); color:black; border-radius:12px; padding:2px 6px; font-size:10px; margin-left:4px;">ZORO</span>';
    }
    return '';
}
function addRefreshButton() {
    const header = document.querySelector('.main-header .header-right');
    
}


// Очищаем таймеры при выходе
window.addEventListener('beforeunload', function() {
    if (friendsUpdateTimer) clearTimeout(friendsUpdateTimer);
    if (channelsUpdateTimer) clearTimeout(channelsUpdateTimer);
});
// Функция для обновления списка друзей с задержкой
function updateFriendsListWithDelay(snapshot) {
    const now = Date.now();
    
    // Если прошло меньше 1 секунды с последнего обновления, откладываем
    if (now - friendsLastUpdate < FRIENDS_UPDATE_DELAY) {
        // Очищаем предыдущий таймер
        if (friendsUpdateTimer) {
            clearTimeout(friendsUpdateTimer);
        }
        
        // Устанавливаем новый таймер
        friendsUpdateTimer = setTimeout(() => {
            processFriendsUpdate(snapshot);
            friendsLastUpdate = Date.now();
            friendsUpdateTimer = null;
        }, FRIENDS_UPDATE_DELAY - (now - friendsLastUpdate));
        
        return;
    }
    
    // Если прошло достаточно времени, обновляем сразу
    processFriendsUpdate(snapshot);
    friendsLastUpdate = now;
}

// Функция обработки обновления друзей (ИСПРАВЛЕННАЯ)
function processFriendsUpdate(snapshot) {
    if (!currentUser || !friendsList) return;
    
    const friends = snapshot.val() || {};
    const friendIds = Object.keys(friends);

    if (friendIds.length === 0) {
        friendsList.innerHTML = '<div class="empty-state">У вас пока нет друзей</div>';
        return;
    }

    // Показываем индикатор загрузки
    friendsList.innerHTML = '<div class="loading"><div class="spinner"></div> Загрузка друзей...</div>';

    const fragment = document.createDocumentFragment();
    let loaded = 0;
    let hasError = false;

    // Если нет друзей, сразу показываем пустое состояние
    if (friendIds.length === 0) {
        friendsList.innerHTML = '<div class="empty-state">У вас пока нет друзей</div>';
        return;
    }

    // Загружаем каждого друга
    friendIds.forEach(friendId => {
        db.ref("users/" + friendId).once("value").then(userSnap => {
            const user = userSnap.val();
            
            // Пропускаем, если пользователь не найден
            if (!user) {
                loaded++;
                checkIfAllFriendsLoaded(loaded, friendIds.length, fragment, hasError);
                return;
            }

            const div = document.createElement('div');
            div.className = 'chat-item';
            div.dataset.type = 'friend';
            div.dataset.id = friendId;

           

            div.innerHTML = `
                <div class="chat-avatar">
                    <img src="${user.avatar || DEFAULT_AVATAR}" alt="">
                    <span class="online-status" style="background: ${user.online ? '#4CAF50' : '#757575'}"></span>
                </div>
                <div class="chat-info">
                    <div class="chat-name">
                        ${sanitize(user.nickname || 'Пользователь')}
                        
                    </div>
                </div>
            `;

            div.onclick = () => openChat('friend', friendId, user.nickname || 'Пользователь', user.avatar);
            fragment.appendChild(div);

            loaded++;
            checkIfAllFriendsLoaded(loaded, friendIds.length, fragment, hasError);
            
        }).catch(error => {
            console.error("Ошибка загрузки друга:", error);
            hasError = true;
            loaded++;
            checkIfAllFriendsLoaded(loaded, friendIds.length, fragment, hasError);
        });
    });
}

function checkIfAllFriendsLoaded(loaded, total, fragment, successfulLoads, failedLoads) {
    if (loaded === total) {
        if (successfulLoads === 0) {
            // Если ни одного друга не загрузилось
            friendsList.innerHTML = '<div class="empty-state">Не удалось загрузить список друзей</div>';
        } else if (failedLoads > 0) {
            // Если некоторые друзья не загрузились, но некоторые загрузились
            friendsList.innerHTML = '';
            friendsList.appendChild(fragment);
            
            // Добавляем уведомление о частичной загрузке
            const notification = document.createElement('div');
            notification.className = 'notification warning';
            notification.style.cssText = 'margin: 8px; padding: 8px; background: var(--surface); border-radius: 8px; border-left: 4px solid #FFC107;';
            notification.innerHTML = `<span>⚠️ Загружено ${successfulLoads} из ${total} друзей</span>`;
            friendsList.insertBefore(notification, friendsList.firstChild);
        } else {
            // Все друзья загрузились успешно
            friendsList.innerHTML = '';
            friendsList.appendChild(fragment);
        }
    }
}


    // ========== LOAD CHANNELS ==========
    function loadChannels() {
        if (!currentUser || !channelsList) return;

        channelsList.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        db.ref("channels").on("value", snapshot => {
            const channels = snapshot.val() || {};
            const fragment = document.createDocumentFragment();
            let hasItems = false;

            Object.entries(channels).forEach(([channelId, channel]) => {
                if ((isChannelsMode && channel.type === 'group') || (!isChannelsMode && channel.type !== 'group')) return;

                if (isChannelsMode && showSubscribedOnly && !channel.members?.[currentUser.uid]) return;
                if (!isChannelsMode && channel.type === 'group' && !channel.members?.[currentUser.uid]) return;

                const isMember = channel.members && channel.members[currentUser.uid];

                const div = document.createElement('div');
                div.className = 'chat-item';
                div.dataset.type = 'channel';
                div.dataset.id = channelId;

                const subscribers = channel.members ? Object.keys(channel.members).length : 0;

                div.innerHTML = `
                    <div class="chat-avatar">
                        <img src="${channel.avatar || DEFAULT_AVATAR}" alt="">
                        ${isMember ? '<span class="online-status" style="background: #4CAF50"></span>' : ''}
                    </div>
                    <div class="chat-info">
                        <div class="chat-name">
                            ${channel.private ? '' : ''}${sanitize(channel.name)}
                            ${channel.verified === 1 ? createCheckmarkSVG() : ''}
                            ${channel.verified === 2 ? '<div class="zgs-badge"><span class="zgs-circle">ZORO</span></div>' : ''}
                        </div>
                        
                        <div class="text-tertiary">${subscribers} ${channel.type === 'group' ? 'участников' : 'подписчиков'}</div>
                    </div>
                `;

                div.onclick = () => openChat('channel', channelId, channel.name, channel.avatar);
                fragment.appendChild(div);
                hasItems = true;
            });

            channelsList.innerHTML = '';
            if (hasItems) {
                channelsList.appendChild(fragment);
            } else {
                channelsList.innerHTML = '<div class="empty-state">Нет доступных каналов</div>';
            }
        });
    }
    
function copyProfileLink() {
  if (!currentUser) {
    showNotification("Сначала войдите в систему", "error");
    return;
  }
  
  // Создаем ссылку на профиль
  const baseUrl = window.location.origin;
  const profileLink = `https://viagramka.ru/user.html?id=${currentUser.uid}`;
  
  // Копируем в буфер обмена
  navigator.clipboard.writeText(profileLink).then(() => {
    // Показываем уведомление
    showNotification("Ссылка на профиль скопирована!", "success");
    
    // Добавляем анимацию для кнопки
    const btn = document.getElementById('inviteLinkBtn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);
    
  }).catch(err => {
    console.error("Ошибка копирования:", err);
    showNotification("❌ Не удалось скопировать ссылку", "error");
  });
}
	
    // ========== SWITCH CHANNELS MODE ==========
function switchChannelsMode(showSubscribed = false) {
    // Обновляем режим отображения
    showSubscribedOnly = showSubscribed;
    
    // Обновляем заголовок в зависимости от режима
    if (isChannelsMode) {
        channelsTitle.textContent = showSubscribedOnly ? "Мои каналы" : "Все каналы";
    } else {
        channelsTitle.textContent = showSubscribedOnly ? "Мои группы" : "Все группы";
    }
    
    // Загружаем каналы с новыми параметрами
    loadChannels();
}

// Функция для показа каналов (кнопка "Каналы")
function showChannels() {
    isChannelsMode = true; // Режим каналов
    showSubscribedOnly = false; // Показываем все каналы
    
    // Обновляем UI
    channelsTitle.textContent = "Все каналы";
    
    // Активируем соответствующую кнопку в навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes('showChannels')) {
            item.classList.add('active');
        }
    });
    
    // Загружаем каналы
    loadChannels();
}

function showGroups() {
    isChannelsMode = false; // Режим групп
    showSubscribedOnly = true; // Только группы, в которых состоит пользователь
    
    // Обновляем UI
    searchSection.style.display = 'none'; // Скрываем поиск на вкладке групп
    friendsSection.style.display = 'none'; // Скрываем друзей
    channelsSection.style.display = 'block'; // Показываем секцию каналов/групп
    channelsTitle.textContent = "Мои группы";
    
    // Активируем кнопку групп
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('[title="Группы"]').classList.add('active');
    
    // Загружаем группы
    loadChannels();
}

// Функция для показа подписок (кнопка с иконкой динамика)
function showSubscriptions() {
    isChannelsMode = true; // Режим каналов
    showSubscribedOnly = true; // Показываем только подписки
    
    // Обновляем UI
    channelsTitle.textContent = "Мои подписки на каналы";
    
    // Активируем соответствующую кнопку в навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes('showSubscriptions')) {
            item.classList.add('active');
        }
    });
    
    // Загружаем каналы
    loadChannels();
}

// Функция для поиска (вкладка с лупой)
function showAll() {
    // Показываем секцию поиска и друзей
    searchSection.style.display = 'block';
    friendsSection.style.display = 'block';
    channelsSection.style.display = 'block';
    
    // Обновляем заголовок
    channelsTitle.textContent = isChannelsMode ? "Каналы" : "Группы";
    
    // Активируем кнопку поиска
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes('showAll')) {
            item.classList.add('active');
        }
    });
    
    // Загружаем данные
    loadChannels();
}
function showFriends() {
    // Показываем только секцию друзей, остальное скрываем
    searchSection.style.display = 'none'; // Скрываем поиск
    friendsSection.style.display = 'block'; // Показываем друзей
    channelsSection.style.display = 'none'; // Скрываем каналы/группы
    
    // Активируем кнопку друзей
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('[data-tab="friends"]').classList.add('active');
    
    // Сбрасываем поиск
    searchInput.value = '';
    
    // Обновляем заголовок (если есть)
    const friendsTitle = document.querySelector('#friendsSection h3');
    if (friendsTitle) {
        friendsTitle.textContent = 'Друзья';
    }
}
// ========== ОБНОВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ КАНАЛОВ ==========
function loadChannels() {
    if (!currentUser || !channelsList) return;

    channelsList.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    db.ref("channels").on("value", snapshot => {
        const channels = snapshot.val() || {};
        const fragment = document.createDocumentFragment();
        let hasItems = false;

        Object.entries(channels).forEach(([channelId, channel]) => {
            // Определяем, канал это или группа
            const isChannel = channel.type === 'channel' || !channel.type; // по умолчанию считаем каналом
            const isGroup = channel.type === 'group';
            
            // Фильтруем в зависимости от режима
            if (isChannelsMode && isGroup) return; // В режиме каналов не показываем группы
            if (!isChannelsMode && !isGroup) return; // В режиме групп не показываем каналы
            
            // Фильтр по подпискам
            if (showSubscribedOnly && !channel.members?.[currentUser.uid]) return;

            const isMember = channel.members && channel.members[currentUser.uid];
            const subscribers = channel.members ? Object.keys(channel.members).length : 0;

            const div = document.createElement('div');
            div.className = 'chat-item';
            div.dataset.type = 'channel';
            div.dataset.id = channelId;

            div.innerHTML = `
                <div class="chat-avatar">
                    <img src="${channel.avatar || DEFAULT_AVATAR}" alt="">
                    ${isMember ? '<span class="online-status" style="background: #4CAF50"></span>' : ''}
                </div>
                <div class="chat-info">
                    <div class="chat-name">
                        ${sanitize(channel.name)}
                        ${channel.verified === 1 ? createCheckmarkSVG() : ''}
                        ${channel.verified === 2 ? '<div class="zgs-badge"><span class="zgs-circle">ZORO</span></div>' : ''}
                    </div>
                    <div class="text-tertiary">${subscribers} ${isGroup ? 'участников' : 'подписчиков'}</div>
                </div>
            `;

            div.onclick = () => openChat('channel', channelId, channel.name, channel.avatar);
            fragment.appendChild(div);
            hasItems = true;
        });

        channelsList.innerHTML = '';
        if (hasItems) {
            channelsList.appendChild(fragment);
        } else {
            channelsList.innerHTML = '<div class="empty-state">Нет доступных каналов</div>';
        }
    });
}

// ========== ОБНОВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ НАВИГАЦИИ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Назначаем обработчики для кнопок навигации
    const navItems = document.querySelectorAll('.nav-item');
    
    // Кнопка поиска (лупа)
    navItems[0].addEventListener('click', () => {
        showAll();
    });
    
    // Кнопка друзей (иконка с людьми)
    navItems[1].addEventListener('click', () => {
        searchSection.style.display = 'none';
        friendsSection.style.display = 'block';
        channelsSection.style.display = 'none';
        
        navItems.forEach(i => i.classList.remove('active'));
        navItems[1].classList.add('active');
        
        searchInput.value = '';
        filterLists('');
    });
    
    // Кнопка групп
    navItems[2].addEventListener('click', showGroups);
    
    // Кнопка каналов/подписок (динамик)
    navItems[3].addEventListener('click', showSubscriptions);
});
    // ========== NAVIGATION ==========
    const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        searchSection.style.display = (tab === 'all') ? 'block' : 'none';
        friendsSection.style.display = (tab === 'all' || tab === 'friends') ? 'block' : 'none';
        channelsSection.style.display = (tab === 'all' || tab === 'channels') ? 'block' : 'none';
        
        // Сброс поиска при смене вкладки
        searchInput.value = '';
        // Показываем все элементы (сбрасываем фильтрацию)
        document.querySelectorAll('#friendsList .chat-item, #channelsList .chat-item').forEach(item => {
            item.style.display = 'flex';
        });
    });
});
async function saveChannelSettings() {
    if (!currentChat || currentChat.type !== 'channel') {
        showNotification("Это не канал", "error");
        return;
    }
    
    // Проверяем права
    const snap = await db.ref("channels/" + currentChat.id).once("value");
    const channel = snap.val();
    
    if (!channel) {
        showNotification("Канал не найден", "error");
        hideModal(channelSettingsModal);
        return;
    }
    
    if (channel.createdBy !== currentUser.uid) {
        showNotification("Только создатель может изменить настройки", "error");
        hideModal(channelSettingsModal);
        return;
    }
    
    const name = channelNameInput.value.trim();
    const description = channelDescriptionInput.value.trim();
    const avatarFile = channelSettingsAvatarUpload.files[0];
    
    if (!name) {
        channelSettingsError.textContent = "Введите название канала";
        return;
    }
    
    try {
        channelSettingsError.textContent = "Сохранение...";
        
        let avatarUrl = channel.avatar || DEFAULT_AVATAR;
        
        // Если загружен новый аватар
        if (avatarFile) {
            avatarUrl = await new Promise((resolve, reject) => {
                uploadImageToFreeImageHost(avatarFile, (err, url) => {
                    if (err) reject(err);
                    else resolve(url);
                });
            });
        }
        
        // Обновляем данные канала
        await db.ref("channels/" + currentChat.id).update({
            name: name,
            description: description || "",
            avatar: avatarUrl
        });
        
        // Обновляем информацию в текущем чате
        if (currentChat) {
            currentChat.name = name;
            currentChat.avatar = avatarUrl;
            chatName.textContent = name;
            chatAvatar.src = avatarUrl;
        }
        
        hideModal(channelSettingsModal);
        showNotification("Настройки канала сохранены", "success");
        
    } catch (error) {
        console.error("Ошибка сохранения настроек канала:", error);
        channelSettingsError.textContent = "Ошибка сохранения: " + error.message;
    }
}
    // ========== AUDIO ==========
    let audioUnlocked = false;
    function unlockAudio() {
        if (audioUnlocked) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        ctx.resume().then(() => {
            audioUnlocked = true;
            console.log('Аудио разблокировано');
        });
    }
    document.body.addEventListener('click', unlockAudio, { once: true });
    document.body.addEventListener('touchstart', unlockAudio, { once: true });

    function playSound(soundId) {
        if (!audioUnlocked) {
            console.log('Аудио ещё не разблокировано, звук не будет воспроизведён');
            return;
        }
        const sound = document.getElementById(soundId);
        if (!sound) return;
        sound.currentTime = 0;
        sound.volume = 0.5;
        sound.play().catch(e => console.log('Ошибка воспроизведения', e));
    }



function appendMessage(msg, firebaseKey = null) {
	
	removeEmptyChatMessage();
	
    const existingMsg = document.querySelector(`[data-message-id="${msg.timestamp}"]`);
    if (existingMsg) {
        updateExistingMessage(existingMsg, msg);
        return;
    }
    let senderHtml = '';
	
	
    const div = document.createElement('div');
    div.className = `message ${msg.senderId === currentUser?.uid ? 'self' : 'other'}`;
    div.dataset.messageId = msg.timestamp;
    if (firebaseKey) div.dataset.firebaseKey = firebaseKey;

    let content = '';

    if (msg.forwarded) {
        content += `<div class="forwarded-header"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M4.01 6.03L2.59 7.45 5.17 10H12.1C12.5 9.4 12.97 8.85 13.5 8.36C14.11 7.79 14.81 7.3 15.58 6.92C16.35 6.54 17.17 6.25 18.04 6.06C18.91 5.87 19.79 5.77 20.68 5.77H20.69V3.77H20.68C19.54 3.77 18.41 3.9 17.31 4.15C16.21 4.4 15.15 4.77 14.14 5.25C13.13 5.73 12.18 6.32 11.3 7.01C10.42 7.7 9.63 8.48 8.92 9.35L4.01 6.03ZM4 8.46V18.3C4 19.4 4.9 20.3 6 20.3H18C19.1 20.3 20 19.4 20 18.3V8.46L14.46 12.73C13.3 13.71 11.8 14.3 10.2 14.3C8.6 14.3 7.1 13.71 5.94 12.73L4 8.46Z"/></svg> Переслано от: ${sanitize(msg.forwardedFrom || msg.senderName)}</div>`;
    }
    
	if (currentChat) {
		senderHtml = msg.senderId !== currentUser?.uid ? `<div class="sender">${sanitize(msg.senderName)}</div>` : '';
      
		
    }
	
    if (msg.replyTo) {
        content += `<div class="reply-preview" onclick="scrollToMessage(${msg.replyTo})"><div class="reply-sender" style="font-size:11px; color:var(--text-secondary);">${sanitize(msg.replyToSenderName)}</div><div class="reply-text">${sanitize(msg.replyToText || '')}</div></div>`;
    }

    if (msg.text) {
        const formattedText = parseMarkdown(msg.text);
        content += `<div class="text">${formattedText}</div>`;
    }
    if (msg.imageUrl) {
        content += `<img src="${msg.imageUrl}" class="message-image" onclick="showImageModal('${msg.imageUrl}')">`;
    }
    if (msg.mediaType === 'video' || msg.videoUrl) {
        const videoUrl = msg.mediaUrl || msg.videoUrl;
        content += `
            <div class="video-message">
                <video src="${videoUrl}" controls style="max-width: 250px; max-height: 250px; border-radius: 12px;" onclick="event.stopPropagation()">
                    Ваш браузер не поддерживает видео.
                </video>
            </div>`;
    }
    if (msg.audioUrl) {
        content += `
            <div class="voice-message" onclick="playAudioMessage('${msg.audioUrl}', this)">
                <button class="play-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></button>
                <div class="progress-bar"><div class="progress"></div></div>
                <div class="duration">${Math.floor(msg.duration || 0)}s</div>
            </div>`;
    }

    // Реакции (только для каналов)
    let reactionsHtml = '';
    if (currentChat && currentChat.type === 'channel') {
        reactionsHtml = '<div class="message-reactions">';
        const emojiList = ['♡', '👍', '😄', '😮', '😢', '👎'];
        if (msg.reactions) {
            emojiList.forEach(emoji => {
                const users = msg.reactions[emoji] || [];
                const count = users.length;
                const userReacted = users.includes(currentUser?.uid);
                reactionsHtml += `<button class="reaction-btn ${userReacted ? 'active' : ''}" data-emoji="${emoji}">${emoji} ${count ? count : ''}</button>`;
            });
        } else {
            emojiList.forEach(emoji => {
                reactionsHtml += `<button class="reaction-btn" data-emoji="${emoji}">${emoji}</button>`;
            });
        }
        reactionsHtml += '</div>';
    }

    // Комментарии для каналов
    let commentsHtml = '';
    if (currentChat && currentChat.type === 'channel') {
        const commentCount = msg.commentCount || 0;
        commentsHtml = `
            <div style="display: flex; align-items: center; margin-top: 6px;">
                <button class="message-comment-btn" style="display: none;" onclick="showComments('${firebaseKey}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 6h-2v2h-2V6h-2V4h2V2h2v2h2v2zm-6-4v2h-2V2h2zm0 8h-2v2h2v-2zm-4-4H9v2h2V6zm0 8H9v2h2v-2zm-4-4H5v2h2v-2zm12 4h-2v-2h-2v2h2v2h-2v2h2v-2h2v-2zM4 4h8v2H4v12h12v-6h2v8H2V4h2z"/>
                    </svg>
                    <span class="message-comment-count">${commentCount}</span>
                </button>
            </div>
        `;
    }

    let timeHtml = msg.edited 
        ? `<div class="message-time"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> ред. ${formatTime(msg.timestamp)}</div>`
        : `<div class="message-time">${formatTime(msg.timestamp)}</div>`;

    let statusHtml = '';
    if (msg.senderId === currentUser?.uid) {
        statusHtml = `<div style="display: none;">${msg.read ? '<span class="double-check" style="color:var(--primary);">✓✓</span>' : '<span class="single-check">✓</span>'}</div>`;
    }

    div.innerHTML = `
        <div class="content">
            ${senderHtml}
            ${content}
            ${reactionsHtml}
            ${commentsHtml}
            <div class="message-footer">
                ${timeHtml}
                ${statusHtml}
            </div>
        </div>
    `;

    // Меняем contextmenu на click
    div.addEventListener('click', (e) => {
        // Не открываем меню, если клик был по кнопке или ссылке
        if (e.target.tagName === 'BUTTON' || 
            e.target.tagName === 'IMG' || 
            e.target.closest('.reaction-btn') ||
            e.target.closest('.message-comment-btn') ||
            e.target.closest('.reply-preview')) {
            return;
        }
        e.preventDefault();
        showContextMenu(e, { ...msg, firebaseKey });
    });

    chatMessages.appendChild(div);
    scrollToBottom();
}

function showEmptyChatMessage() {
    emptyMessage = true;
    const existingEmpty = document.querySelector('.empty-chat-message');
    if (existingEmpty) existingEmpty.remove();
    
    
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.remove();
    
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-chat-message';
    
    
    let messageText = 'В этом чате пусто... Отправьте первое сообщение!';
    let iconPath = '"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"';
    
    if (currentChat) {
        if (currentChat.type === 'channel') {
            messageText = 'В этом канале пока нет постов...';
            iconPath = '"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z"';
        } else if (currentChat.type === 'friend' && currentChat.id === currentUser?.uid) {
            messageText = 'Это ваше избранное. Здесь можно сохранять заметки, фото и важные сообщения.';
            iconPath = '"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"';
        }
    }
    
    emptyDiv.innerHTML = `
        <div class="empty-state-icon" onclick="sayHi();">
            <p style="font-size: 20px; cursor: pointer;" onclick="sayHi();">👋</p>
        </div>
        <div class="empty-state-text">${messageText}</div>
    `;
    
    chatMessages.appendChild(emptyDiv);
}
async function sayHi()
{
	let messageText = "👋";
	if(emptyMessage === true)
	{
		
        
		removeEmptyChatMessage();

        if (!messageText || !currentChat || !currentUser) return;

        if (autoCorrectEnabled) {
            messageText = autoCorrectText(messageText);
        }

        const msgObj = {
            text: messageText,
            senderId: currentUser.uid,
            senderName: currentUser.nickname,
            
            timestamp: Date.now(),
            read: false
        };

        if (isReplying && messageToReply) {
            msgObj.replyTo = messageToReply.timestamp;
            msgObj.replyToText = messageToReply.text || (messageToReply.imageUrl ? '📷 Фото' : '🎤 Голосовое');
            msgObj.replyToSenderName = messageToReply.senderName;
        }

        try {
            
            const chatId = getChatId(currentUser.uid, currentChat.id);
            await db.ref("messages/" + chatId).push(msgObj);
            messageInput.value = "";
            resizeTextarea();
            if (isReplying) cancelReply();
        } catch (error) {
            showNotification("Ошибка отправки", "error");
        }
	}
	else{
		return;
		
	}
}
function loadRecentEmojis() {
    try {
        const saved = localStorage.getItem('recentEmojis');
        if (saved) {
            recentEmojis = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Ошибка загрузки recent emojis:', e);
    }
}

// Сохраняем использованные эмодзи
function saveRecentEmoji(emoji) {
    if (!recentEmojis.includes(emoji)) {
        recentEmojis.unshift(emoji);
        if (recentEmojis.length > 15) {
            recentEmojis.pop();
        }
        try {
            localStorage.setItem('recentEmojis', JSON.stringify(recentEmojis));
        } catch (e) {
            console.error('Ошибка сохранения recent emojis:', e);
        }
    }
}

// Создаем панель эмодзи
function createEmojiPicker() {
    // Удаляем существующую панель
    const existingPicker = document.querySelector('.emoji-picker-container');
    if (existingPicker) existingPicker.remove();
    
    const pickerContainer = document.createElement('div');
    pickerContainer.className = 'emoji-picker-container';
    
    const picker = document.createElement('div');
    picker.className = 'emoji-picker hidden';
    picker.id = 'emojiPicker';
    
    // Поиск
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'emoji-search';
    searchInput.placeholder = '🔍 Поиск эмодзи...';
    
    // Недавние
    const recentDiv = document.createElement('div');
    recentDiv.className = 'recent-emojis';
    recentDiv.id = 'recentEmojis';
    updateRecentEmojisDisplay(recentDiv);
    
    // Категории
    const categoriesDiv = document.createElement('div');
    categoriesDiv.className = 'emoji-categories';
    
    let firstCategory = true;
    Object.keys(emojiCategories).forEach(categoryName => {
        const catBtn = document.createElement('span');
        catBtn.className = `emoji-category ${firstCategory ? 'active' : ''}`;
        catBtn.textContent = categoryName;
        catBtn.dataset.category = categoryName;
        catBtn.onclick = () => switchEmojiCategory(categoryName);
        categoriesDiv.appendChild(catBtn);
        firstCategory = false;
    });
    
    // Сетка эмодзи
    const gridDiv = document.createElement('div');
    gridDiv.className = 'emoji-grid';
    gridDiv.id = 'emojiGrid';
    
    // Показываем первую категорию
    showEmojiCategory(Object.keys(emojiCategories)[0], gridDiv);
    
    picker.appendChild(searchInput);
    picker.appendChild(recentDiv);
    picker.appendChild(categoriesDiv);
    picker.appendChild(gridDiv);
    pickerContainer.appendChild(picker);
    
    // Вставляем после поля ввода
    const messageInputWrapper = document.querySelector('.message-input-wrapper');
    if (messageInputWrapper) {
        messageInputWrapper.parentNode.insertBefore(pickerContainer, messageInputWrapper.nextSibling);
    }
    
    // Обработка поиска
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterEmojis(query, gridDiv);
    });
    
    return pickerContainer;
}

// Обновление недавних эмодзи
function updateRecentEmojisDisplay(container) {
    if (recentEmojis.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    container.innerHTML = '';
    recentEmojis.forEach(emoji => {
        const span = document.createElement('span');
        span.className = 'recent-emoji';
        span.textContent = emoji;
        span.onclick = () => insertEmoji(emoji);
        container.appendChild(span);
    });
}

// Переключение категории эмодзи
function switchEmojiCategory(categoryName) {
    document.querySelectorAll('.emoji-category').forEach(cat => {
        cat.classList.toggle('active', cat.dataset.category === categoryName);
    });
    
    const grid = document.getElementById('emojiGrid');
    if (grid) {
        showEmojiCategory(categoryName, grid);
    }
}

// Показать эмодзи категории
function showEmojiCategory(categoryName, grid) {
    const emojis = emojiCategories[categoryName] || [];
    grid.innerHTML = '';
    
    emojis.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'emoji-item';
        div.textContent = emoji;
        div.onclick = () => insertEmoji(emoji);
        grid.appendChild(div);
    });
}

// Фильтрация эмодзи
function filterEmojis(query, grid) {
    if (!query) {
        // Возвращаем текущую категорию
        const activeCategory = document.querySelector('.emoji-category.active');
        if (activeCategory) {
            showEmojiCategory(activeCategory.dataset.category, grid);
        }
        return;
    }
    
    // Поиск по всем эмодзи
    const allEmojis = Object.values(emojiCategories).flat();
    const filtered = allEmojis.filter(emoji => 
        emoji.toLowerCase().includes(query)
    );
    
    grid.innerHTML = '';
    filtered.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'emoji-item';
        div.textContent = emoji;
        div.onclick = () => insertEmoji(emoji);
        grid.appendChild(div);
    });
}

// Вставка эмодзи в поле ввода
function insertEmoji(emoji) {
    const textarea = document.getElementById('messageInput');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    textarea.value = text.substring(0, start) + emoji + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    textarea.focus();
    resizeTextarea();
    
    // Сохраняем в недавние
    saveRecentEmoji(emoji);
    
    // Обновляем недавние
    const recentDiv = document.getElementById('recentEmojis');
    if (recentDiv) {
        updateRecentEmojisDisplay(recentDiv);
    }
}

// Переключение видимости панели эмодзи
function toggleEmojiPicker() {
    
}

// Инициализация эмодзи
function initEmojiPicker() {
    loadRecentEmojis();
    createEmojiPicker();
    
    const emojiBtn = document.getElementById('emojiBtn');
    if (emojiBtn) {
        emojiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleEmojiPicker();
        });
    }
    
    // Закрытие при клике вне панели
    document.addEventListener('click', (e) => {
        if (emojiPickerVisible && 
            !e.target.closest('.emoji-picker') && 
            !e.target.closest('#emojiBtn')) {
            toggleEmojiPicker();
        }
    });
}
function hideContextMenu() {
    const menu = document.querySelector('.context-menu');
    if (menu) {
        menu.remove();
    }
}
    function updateExistingMessage(element, msg) {
        const textEl = element.querySelector('.text');
        if (textEl && msg.text) textEl.innerHTML = parseMarkdown(msg.text);
        if (msg.edited) {
            const timeEl = element.querySelector('.message-time');
            if (timeEl && !timeEl.innerHTML.includes('ред.')) {
                timeEl.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> ред. ${formatTime(msg.timestamp)}</div>`;
            }
        }
        if (msg.senderId === currentUser?.uid) {
            const statusEl = element.querySelector('.message-status');
            if (statusEl) {
                statusEl.innerHTML = msg.read ? '<span class="double-check" style="color:var(--primary);">✓✓</span>' : '<span class="single-check">✓</span>';
            }
        }

        // Обновляем реакции только для каналов
        if (currentChat && currentChat.type === 'channel') {
            let reactionsContainer = element.querySelector('.message-reactions');
            if (!reactionsContainer) {
                reactionsContainer = document.createElement('div');
                reactionsContainer.className = 'message-reactions';
                element.querySelector('.content').appendChild(reactionsContainer);
            }
            const emojiList = ['♡', '👍', '😄', '😮', '😢', '👎'];
            let reactionsHtml = '';
            if (msg.reactions) {
                emojiList.forEach(emoji => {
                    const users = msg.reactions[emoji] || [];
                    const count = users.length;
                    const userReacted = users.includes(currentUser?.uid);
                    reactionsHtml += `<button class="reaction-btn ${userReacted ? 'active' : ''}" data-emoji="${emoji}">${emoji} ${count ? count : ''}</button>`;
                });
            } else {
                emojiList.forEach(emoji => {
                    reactionsHtml += `<button class="reaction-btn" data-emoji="${emoji}">${emoji}</button>`;
                });
            }
            reactionsContainer.innerHTML = reactionsHtml;

            // NEW: Update comment count button
            const commentCountBtn = element.querySelector('.message-comment-count');
            if (commentCountBtn) {
                commentCountBtn.textContent = msg.commentCount || 0;
            }
        } else {
            const reactionsContainer = element.querySelector('.message-reactions');
            if (reactionsContainer) reactionsContainer.remove();
        }
    }

    // ========== OPEN CHAT ==========
    function openChat(type, id, name, avatar) {
	
        console.log("openChat", { type, id, name });

    if (currentChat && currentChat.id === id && currentChat.type === type) {
        console.log('Чат уже открыт');
        return;
    }
    document.getElementById("currentPageTitle").style.display = 'none';
    hidePhotoPreview();
    if (isReplying) cancelReply();
    if (isEditing) cancelEdit();

    currentChat = { type, id, name, avatar };
    chatName.textContent = name;
    chatAvatar.src = avatar || DEFAULT_AVATAR;
    chatMessages.innerHTML = "";
    
    // Делаем имя кликабельным для открытия информации
    chatName.style.cursor = 'pointer';
    chatName.onclick = function() {
        if (type === 'friend') {
            showOtherUserInfo(id);
        } else {
            showChatInfo(); // существующая функция для каналов
        }
    };
    
    document.getElementById('chatsPage').classList.remove('active');
    document.getElementById('chatPage').classList.add('active');
	document.getElementById('chatPage').style.padding = '0px';

    if (currentChatRef) currentChatRef.off();

        const joinBtn = document.querySelector('.join-channel-btn');
        if (joinBtn) joinBtn.remove();
        const infoMsg = document.querySelector('.channel-info-message');
        if (infoMsg) infoMsg.remove();

        messageInput.placeholder = "";
        messageInput.style.display = 'none';
        sendBtn.style.display = 'none';
        attachBtn.style.display = 'none';

        formatToolbar.style.display = 'none';

        const isMe = (currentChat.id === currentUser.uid);

        chatMessages.innerHTML = '<div class="loading" id="loading"><div class="spinner"></div></div>';

        if (type === 'friend') {
		    document.getElementById('.message-input-wrapper').style.display = 'block';
            document.getElementById("formatToolbar").style.display = 'block';
            if (blockedUsers[id]) {
                messageInput.disabled = true;
                sendBtn.disabled = true;
                voiceMessageBtn.style.display = 'none';
                messageInput.placeholder = "Вы заблокировали пользователя";
                chatMessages.innerHTML = '<div class="empty-state">Вы заблокировали этого пользователя</div>';
                return;
            }
            messageInput.style.display = 'block';
			if (!document.querySelector('.emoji-picker-container')) {
                initEmojiPicker();
            }
            sendBtn.style.display = 'flex';
            attachBtn.style.display = 'flex';
            messageInput.disabled = false;
            sendBtn.disabled = false;
            messageInput.placeholder = "Введите сообщение...";

            const chatId = getChatId(currentUser.uid, id);
            currentChatRef = db.ref("messages/" + chatId);

            currentChatRef.limitToLast(100000).once("value", snapshot => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.remove();
    
    if (snapshot.exists()) {
        emptyMessage = false;
        snapshot.forEach(child => appendMessage(child.val(), child.key));
        scrollToBottom();
    } else {
        
        showEmptyChatMessage();
    }
    audioUnlocked = false;
});

            currentChatRef.on("child_added", snap => {
                if (!currentChat || currentChat.type !== 'friend' || currentChat.id !== id) return;
                appendMessage(snap.val(), snap.key);
                playSound('receiveSound');
                unlockAudio();
                scrollToBottom();
            });

            currentChatRef.on("child_changed", snap => {
                const msg = snap.val();
                const el = document.querySelector(`[data-message-id="${msg.timestamp}"]`);
                if (el) updateExistingMessage(el, msg);
            });

            db.ref("users/" + id).on("value", snap => {
                const user = snap.val();
                if (user) {
                    chatStatusDot.style.display = 'block';
                    chatStatusDot.className = user.online ? 'status-dot online' : 'status-dot offline';
                    chatStatus.textContent = user.online ? 'в сети' : 'вышел из сети';
                }
            });

        } else if (type === 'channel') {
            messageInput.placeholder = "";
            messageInput.style.display = 'none';
            sendBtn.style.display = 'none';
            attachBtn.style.display = 'none';
			emptyMessage = false;
            currentChatRef = db.ref("channelMessages/" + id);
            document.getElementById("formatToolbar").style.display = 'none';

            currentChatRef.limitToLast(50000).once("value", snapshot => {
                 const loadingEl = document.getElementById('loading');
                 if (loadingEl) loadingEl.remove();
                 
                 if (snapshot.exists()) {
					 emptyMessage = false;
                     snapshot.forEach(child => appendMessage(child.val(), child.key));
                     scrollToBottom();
                 } else {
					 emptyMessage = false;
                     showEmptyChatMessage();
                 }
            });

            currentChatRef.on("child_added", snap => {
                if (!currentChat || currentChat.type !== 'channel' || currentChat.id !== id) return;
                appendMessage(snap.val(), snap.key);
                scrollToBottom();
                playSound('receiveSound');
            });

            currentChatRef.on("child_changed", snap => {
                const msg = snap.val();
                const el = document.querySelector(`[data-message-id="${msg.timestamp}"]`);
                if (el) updateExistingMessage(el, msg);
            });

            db.ref("channels/" + id).once("value").then(snap => {
                const channel = snap.val();
                if (!channel) return;

                const isGroup = channel.type === 'group';
                const isCreator = channel.createdBy === currentUser.uid;
                const isMember = channel.members && channel.members[currentUser.uid];

                const subscribers = channel.members ? Object.keys(channel.members).length : 0;
                chatStatus.textContent = `${subscribers} ${isGroup ? 'участников' : 'подписчиков'}`;
                chatStatusDot.style.display = 'none';

                const oldJoinBtn = document.querySelector('.join-channel-btn');
                if (oldJoinBtn) oldJoinBtn.remove();
                const oldInfoMsg = document.querySelector('.channel-info-message');
                if (oldInfoMsg) oldInfoMsg.remove();

                if (!isMember) {
                    const btn = document.createElement('button');
                    btn.className = 'join-channel-btn';
                    btn.textContent = isGroup ? 'Войти в группу' : 'Подписаться';
                    btn.onclick = () => joinChannel(id);
                    document.querySelector('.message-input-container').appendChild(btn);
                } else {
                    if (!isGroup && !isCreator) {
                        const info = document.createElement('div');
                        info.className = 'channel-info-message';
                        info.textContent = 'Этот канал только для чтения. Писать может только создатель.';
                        document.querySelector('.message-input-container').appendChild(info);
						
                    } else {
					    document.getElementById('.message-input-wrapper').style.display = 'block';
                        messageInput.style.display = 'block';
                        sendBtn.style.display = 'flex';
                        attachBtn.style.display = 'flex';
                        messageInput.disabled = false;
                        sendBtn.disabled = false;
                        messageInput.placeholder = isGroup ? "Введите сообщение..." : "Вы создатель канала";
                        voiceMessageBtn.style.display = isGroup ? 'flex' : 'none';
                    }
                }
            });
        }

        document.querySelectorAll('.list-item').forEach(i => i.classList.remove('active'));
        const activeItem = document.querySelector(`.list-item[data-type="${type}"][data-id="${id}"]`);
        if (activeItem) activeItem.classList.add('active');
    }

function removeEmptyChatMessage() {
	emptyMessage = false;
    const emptyMsg = document.querySelector('.empty-chat-message');
    if (emptyMsg) {
        emptyMsg.remove();
    }
}
function addFriendById(userId, userName) {
    if (!currentUser) {
        showNotification("Сначала войдите в систему", "error");
        return;
    }

    // Добавляем в друзья
    db.ref(`friends/${currentUser.uid}/${userId}`).set(true).then(() => {
        db.ref(`friends/${userId}/${currentUser.uid}`).set(true).then(() => {
            showNotification(`Пользователь ${userName} добавлен в друзья!`, "success");
            hideModal(chatInfoModal);
        });
    }).catch(error => {
        console.error("Ошибка добавления в друзья:", error);
        showNotification("Ошибка при добавлении в друзья", "error");
    });
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Ссылка скопирована!', 'success');
    }).catch(() => {
        showNotification('Не удалось скопировать ссылку', 'error');
    });
}
    async function joinChannel(channelId) {
        try {
            await db.ref(`channels/${channelId}/members/${currentUser.uid}`).set(true);
            showNotification("Готово!", "success");
            openChat('channel', channelId, currentChat.name, currentChat.avatar);
        } catch (error) {
            showNotification("Ошибка", "error");
        }
    }

    async function toggleReaction(messageElement, emoji) {
        if (!currentChat || !currentUser || currentChat.type !== 'channel') return;
        const firebaseKey = messageElement.dataset.firebaseKey;
        if (!firebaseKey) return;

        const ref = db.ref(`channelMessages/${currentChat.id}/${firebaseKey}/reactions`);

        await ref.transaction(currentReactions => {
            if (!currentReactions) currentReactions = {};
            if (!currentReactions[emoji]) currentReactions[emoji] = [];

            const idx = currentReactions[emoji].indexOf(currentUser.uid);
            if (idx === -1) {
                currentReactions[emoji].push(currentUser.uid);
            } else {
                currentReactions[emoji].splice(idx, 1);
                if (currentReactions[emoji].length === 0) {
                    delete currentReactions[emoji];
                }
            }
            return currentReactions;
        });
    }

    // ========== SEND MESSAGE ==========
    async function sendMessage() {
        let messageText = messageInput.value.trim();
        
		removeEmptyChatMessage();

		
        if (isEditing && messageToEdit) {
            await updateMessage(messageText);
            return;
        }

        if (!messageText || !currentChat || !currentUser) return;

        if (autoCorrectEnabled) {
            messageText = autoCorrectText(messageText);
        }

        const msgObj = {
            text: messageText,
            senderId: currentUser.uid,
            senderName: currentUser.nickname,
            
            timestamp: Date.now(),
            read: false
        };

        if (isReplying && messageToReply) {
            msgObj.replyTo = messageToReply.timestamp;
            msgObj.replyToText = messageToReply.text || (messageToReply.imageUrl ? '📷 Фото' : '🎤 Голосовое');
            msgObj.replyToSenderName = messageToReply.senderName;
        }

        try {
            if (currentChat.type === 'friend') {
                const chatId = getChatId(currentUser.uid, currentChat.id);
                await db.ref("messages/" + chatId).push(msgObj);
            } else if (currentChat.type === 'channel') {
                await db.ref("channelMessages/" + currentChat.id).push(msgObj);
            }

            messageInput.value = "";
            resizeTextarea();
            if (isReplying) cancelReply();
        } catch (error) {
            showNotification("Ошибка отправки", "error");
        }
    }

    async function updateMessage(newText) {
        if (!messageToEdit || !currentChat) return;
        if (messageToEdit.imageUrl || messageToEdit.audioUrl) {
            showNotification("Фото и аудио нельзя редактировать", "error");
            cancelEdit();
            return;
        }
        if (newText === messageToEdit.text) {
            cancelEdit();
            return;
        }
        if (!newText.trim()) {
            showConfirm("Удаление сообщения", "Вы хотите удалить сообщение?", async () => {
                try {
                    if (messageToEdit.firebaseKey) {
                        if (currentChat.type === 'friend') {
                            const chatId = getChatId(currentUser.uid, currentChat.id);
                            await db.ref(`messages/${chatId}/${messageToEdit.firebaseKey}`).remove();
                        } else if (currentChat.type === 'channel') {
                            await db.ref(`channelMessages/${currentChat.id}/${messageToEdit.firebaseKey}`).remove();
                            // Also remove comments for this message if it's a channel post
                            await db.ref(`channelComments/${currentChat.id}/${messageToEdit.firebaseKey}`).remove();
                        }
                    }
                    showNotification("Сообщение удалено", "success");
                } catch (error) {
                    showNotification("Ошибка удаления", "error");
                }
            });
            cancelEdit();
            return;
        }

        try {
            const updates = { text: newText, edited: true, editedAt: Date.now() };
            if (messageToEdit.firebaseKey) {
                if (currentChat.type === 'friend') {
                    const chatId = getChatId(currentUser.uid, currentChat.id);
                    await db.ref(`messages/${chatId}/${messageToEdit.firebaseKey}`).update(updates);
                } else if (currentChat.type === 'channel') {
                    await db.ref(`channelMessages/${currentChat.id}/${messageToEdit.firebaseKey}`).update(updates);
                }
            }
            showNotification("Сообщение отредактировано", "success");
            cancelEdit();
        } catch (error) {
            showNotification("Ошибка редактирования", "error");
        }
    }

    // ========== AUTO CORRECT ==========
    function autoCorrectText(text) {
        const corrections = {
            'првиет': 'привет', 'здраствуйте': 'здравствуйте', 'спосибо': 'спасибо',
            'пажалуйста': 'пожалуйста', 'сдесь': 'здесь', 'вообше': 'вообще'
        };
        let corrected = text;
        Object.keys(corrections).forEach(wrong => {
            const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
            corrected = corrected.replace(regex, corrections[wrong]);
        });
        corrected = corrected.replace(/(^|[.!?]\s+)([a-zа-я])/g, (m, p1, p2) => p1 + p2.toUpperCase());
        corrected = corrected.replace(/\s+/g, ' ').trim();
        return corrected;
    }

    // ========== REPLY / EDIT / DELETE ==========
    function replyToMessage() {
        if (!contextMenuMessage) return;
        messageToReply = contextMenuMessage;
        isReplying = true;

        let preview = '';
        if (messageToReply.text) preview = sanitize(messageToReply.text);
        else if (messageToReply.imageUrl) preview = '📷 Фото';
        else if (messageToReply.audioUrl) preview = '🎤 Голосовое';

        replyContainer.classList.remove('hidden');
        replyContainer.querySelector('.reply-sender').textContent = messageToReply.senderName;
        replyContainer.querySelector('.reply-preview').textContent = preview;

        messageInput.focus();
    }

    function cancelReply() {
        isReplying = false;
        messageToReply = null;
        replyContainer.classList.add('hidden');
    }

    function editMessage() {
        if (!contextMenuMessage || contextMenuMessage.senderId !== currentUser?.uid) return;
        messageToEdit = contextMenuMessage;
        isEditing = true;

        if (messageToEdit.text && !messageToEdit.imageUrl && !messageToEdit.audioUrl) {
            messageInput.value = messageToEdit.text;
            resizeTextarea();
        } else {
            messageInput.value = '';
            messageInput.placeholder = "Фото и аудио нельзя редактировать";
            messageInput.disabled = true;
            sendBtn.disabled = true;
        }

        editContainer.classList.remove('hidden');
        editContainer.querySelector('.edit-preview').textContent = messageToEdit.text ? sanitize(messageToEdit.text) : (messageToEdit.imageUrl ? '📷 Фото' : '🎤 Голосовое');
        messageInput.focus();
    }

    function cancelEdit() {
        isEditing = false;
        messageToEdit = null;
        editContainer.classList.add('hidden');
        messageInput.value = '';
        messageInput.placeholder = "Введите сообщение...";
        messageInput.disabled = false;
        sendBtn.disabled = false;
        resizeTextarea();
    }

    function deleteMessage() {
        if (!contextMenuMessage) return;
        const confirmDiv = document.createElement('div');
        confirmDiv.className = 'delete-confirm';
        confirmDiv.innerHTML = `
            <div class="delete-confirm-content">
                <p>Удалить сообщение?</p>
                <div class="delete-confirm-actions">
                    <button class="delete-confirm-btn cancel" onclick="cancelDelete(this)">Отмена</button>
                    <button class="delete-confirm-btn delete" onclick="confirmDelete()">Удалить</button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmDiv);
    }

    function cancelDelete(btn) {
        btn.closest('.delete-confirm').remove();
        contextMenuMessage = null;
    }

    async function confirmDelete() {
        const message = contextMenuMessage;
        if (!message) return;

        try {
            let messagePath = '';
            if (currentChat.type === 'friend') {
                const chatId = getChatId(currentUser.uid, currentChat.id);
                const snap = await db.ref(`messages/${chatId}`).orderByChild('timestamp').equalTo(message.timestamp).once('value');
                snap.forEach(child => { messagePath = `messages/${chatId}/${child.key}`; });
            } else if (currentChat.type === 'channel') {
                const snap = await db.ref(`channelMessages/${currentChat.id}`).orderByChild('timestamp').equalTo(message.timestamp).once('value');
                snap.forEach(child => { messagePath = `channelMessages/${currentChat.id}/${child.key}`; });
                // Also remove comments for this message
                await db.ref(`channelComments/${currentChat.id}/${child.key}`).remove();
            }
            if (messagePath) {
                await db.ref(messagePath).remove();
                const el = document.querySelector(`[data-message-id="${message.timestamp}"]`);
                if (el) el.remove();
                showNotification("Сообщение удалено", "success");
            }
        } catch (error) {
            showNotification("Ошибка удаления", "error");
        }
        document.querySelector('.delete-confirm')?.remove();
        contextMenuMessage = null;
    }

    function forwardMessage() {
        if (!contextMenuMessage) return;
        messageToForward = contextMenuMessage;
        showForwardModal();
    }

    function showForwardModal() {
        showModal(forwardModal);
        forwardChatsList.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        forwardButton.disabled = true;

        db.ref("friends/" + currentUser.uid).once("value").then(snap => {
            const friends = snap.val() || {};
            if (Object.keys(friends).length === 0) {
                forwardChatsList.innerHTML = '<div class="empty-state">Нет друзей</div>';
                return;
            }

            let html = '';
            let loaded = 0;
            const total = Object.keys(friends).length;

            Object.keys(friends).forEach(friendId => {
                db.ref("users/" + friendId).once("value").then(userSnap => {
                    const user = userSnap.val();
                    if (user) {
                        html += `
                            <div class="forward-chat-item" data-id="${friendId}" onclick="selectForwardChat(this)">
                                <img src="${user.avatar || DEFAULT_AVATAR}">
                                <div>${sanitize(user.nickname)}</div>
                            </div>`;
                    }
                    loaded++;
                    if (loaded === total) {
                        forwardChatsList.innerHTML = html;
                    }
                });
            });
        });
    }

    window.selectForwardChat = function(el) {
        document.querySelectorAll('.forward-chat-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        forwardButton.disabled = false;
        forwardButton.onclick = () => confirmForward(el.dataset.id);
    };

    function confirmForward(friendId) {
        if (!messageToForward) return;

        const forwardMsg = {
            text: messageToForward.text || null,
            imageUrl: messageToForward.imageUrl || null,
            audioUrl: messageToForward.audioUrl || null,
            senderId: currentUser.uid,
            senderName: currentUser.nickname,
            
            timestamp: Date.now(),
            read: false,
            forwarded: true,
            forwardedFrom: messageToForward.senderName,
            forwardedFromId: messageToForward.senderId
        };

        Object.keys(forwardMsg).forEach(k => forwardMsg[k] === undefined && delete forwardMsg[k]);

        const chatId = getChatId(currentUser.uid, friendId);
        db.ref("messages/" + chatId).push(forwardMsg)
            .then(() => {
                showNotification("Сообщение переслано", "success");
                hideModal(forwardModal);
                messageToForward = null;
            })
            .catch(err => showNotification("Ошибка пересылки", "error"));
    }

    // ========== CONTEXT MENU ==========
    function showContextMenu(e, message) {
        const oldMenu = document.querySelector('.context-menu');
        if (oldMenu) oldMenu.remove();

        contextMenuMessage = message;

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';

        const isMyMessage = message.senderId === currentUser?.uid;

        menu.innerHTML = `
		    <div class="context-menu-item" onclick="showProfileFromMessage('${message.senderId}', '${sanitize(message.senderName)}')">Профиль</div>
            <div class="context-menu-item" onclick="forwardMessage()">Переслать</div>
            <div class="context-menu-item" onclick="replyToMessage()">Ответить</div>
            ${isMyMessage ? `
                <div class="context-menu-item" onclick="editMessage()">Редактировать</div>
                <div class="context-menu-item" onclick="deleteMessage()">Удалить</div>
            ` : ''}
        `;

        document.body.appendChild(menu);

        setTimeout(() => {
            const closeHandler = (ce) => {
                if (!menu.contains(ce.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 0);
    }
	
function showProfileFromMessage(senderId, senderName) {
    hideContextMenu();
	if (!senderId) {
        showNotification("Не удалось определить отправителя", "error");
        return;
    }

    // Если это текущий пользователь - показываем его профиль
    if (currentUser && senderId === currentUser.uid) {
        showProfileSettings();
        return;
    }

    // Показываем профиль другого пользователя
    showOtherUserInfo(senderId);
}

function showMediaPreview(file) {
    if (file.type.startsWith('image/')) {
        // Обработка изображений
        if (file.size > 10 * 1024 * 1024) {
            showNotification("Файл слишком большой (макс. 10MB)", "error");
            return;
        }
        if (selectedPhotos.length >= MAX_PHOTOS) {
            showNotification(`Максимум ${MAX_PHOTOS} фото`, "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            selectedPhotos.push({ 
                file, 
                dataUrl: e.target.result, 
                type: 'image',
                quality: 'sd', 
                caption: '' 
            });
            updateMediaPreview();
            photoPreviewContainer.classList.add('show');
            messageInput.style.display = 'none';
            sendBtn.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
        // Обработка видео
        if (file.size > MAX_VIDEO_SIZE) {
            showNotification("Видео слишком большое (макс. 50MB)", "error");
            return;
        }
        if (selectedPhotos.length >= MAX_PHOTOS) {
            showNotification(`Максимум ${MAX_PHOTOS} файлов`, "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            selectedPhotos.push({ 
                file, 
                dataUrl: e.target.result, 
                type: 'video',
                quality: 'sd', 
                caption: '' 
            });
            updateMediaPreview();
            photoPreviewContainer.classList.add('show');
            messageInput.style.display = 'none';
            sendBtn.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        showNotification("Неподдерживаемый формат файла", "error");
    }
}

function updateMediaPreview() {
    photosInnerContainer.innerHTML = '';
    selectedPhotos.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'preview-item';
        
        if (media.type === 'image') {
            item.innerHTML = `
                <img src="${media.dataUrl}">
                <div class="preview-remove" onclick="removeMedia(${index})">×</div>
                <div class="quality-badge">${media.quality.toUpperCase()}</div>
            `;
        } else if (media.type === 'video') {
            // Создаем превью для видео
            const video = document.createElement('video');
            video.src = media.dataUrl;
            video.preload = 'metadata';
            
            // Получаем первый кадр видео как превью
            video.onloadeddata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/jpeg');
                item.innerHTML = `
                    ${img.outerHTML}
                    <div class="preview-remove" onclick="removeMedia(${index})">×</div>
                    <div class="quality-badge">🎥 ВИДЕО</div>
                `;
            };
            
            // Пока показываем placeholder
            item.innerHTML = `
                <div style="width:100%; height:100%; background:var(--surface); display:flex; align-items:center; justify-content:center;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--text-secondary)">
                        <path d="M10 8.64L15.27 12 10 15.36V8.64zM21 6v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2z"/>
                    </svg>
                </div>
                <div class="preview-remove" onclick="removeMedia(${index})">×</div>
                <div class="quality-badge">🎥 ВИДЕО</div>
            `;
        }
        
        photosInnerContainer.appendChild(item);
    });
}

function removeMedia(index) {
    selectedPhotos.splice(index, 1);
    if (selectedPhotos.length === 0) hidePhotoPreview();
    else updateMediaPreview();
}

    function hidePhotoPreview() {
        photoPreviewContainer.classList.remove('show');
        messageInput.style.display = 'block';
        sendBtn.style.display = 'flex';
    }

    function cancelPhotoUpload() {
        selectedPhotos = [];
        hidePhotoPreview();
        showNotification("Отправка отменена", "info");
    }

async function sendSelectedPhotos() {
    if (!selectedPhotos.length || !currentChat) return;

    const mediaToSend = [...selectedPhotos];
    const total = mediaToSend.length;
    let success = 0;
    let failed = 0;

    hidePhotoPreview();
    showNotification(`Отправка ${total} файлов...`, "info");

    for (let i = 0; i < mediaToSend.length; i++) {
        const media = mediaToSend[i];
        try {
            let url;
            
            if (media.type === 'image') {
                // Сжимаем изображение
                const quality = media.quality === 'sd' ? 0.7 : 0.85;
                const compressed = await compressImage(media.file, quality);
                url = await uploadCompressedImage(compressed.blob);
            } else if (media.type === 'video') {
                // Загружаем видео без сжатия (или можно добавить сжатие видео)
                url = await uploadVideo(media.file);
            }

            const msgObj = {
                mediaUrl: url,
                mediaType: media.type,
                senderId: currentUser.uid,
                senderName: currentUser.nickname,
                
                timestamp: Date.now() + i,
                read: false,
                caption: media.caption || '',
                quality: media.quality
            };

            // Для обратной совместимости добавляем imageUrl если это изображение
            if (media.type === 'image') {
                msgObj.imageUrl = url;
            }

            if (currentChat.type === 'friend') {
                const chatId = getChatId(currentUser.uid, currentChat.id);
                await db.ref("messages/" + chatId).push(msgObj);
            } else {
                await db.ref("channelMessages/" + currentChat.id).push(msgObj);
            }
            success++;
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            failed++;
            showNotification(`Ошибка при загрузке файла ${i+1}: ${err.message || 'неизвестная ошибка'}`, 'error');
        }
    }

    selectedPhotos = [];
    if (failed === 0) {
        showNotification(`Все ${total} файлов отправлены`, 'success');
    } else {
        showNotification(`Отправлено ${success} из ${total} файлов`, 'warning');
    }
    setTimeout(scrollToBottom, 500);
}

// Фильтрация списков друзей и каналов по введённому тексту
function filterLists(searchText) {
    const query = searchText.toLowerCase().trim();
    
    // Фильтруем друзей
    document.querySelectorAll('#friendsList .chat-item').forEach(item => {
        const name = item.querySelector('.chat-name')?.textContent.toLowerCase() || '';
        item.style.display = name.includes(query) ? 'flex' : 'none';
    });
    
    // Фильтруем каналы
    document.querySelectorAll('#channelsList .chat-item').forEach(item => {
        const name = item.querySelector('.chat-name')?.textContent.toLowerCase() || '';
        item.style.display = name.includes(query) ? 'flex' : 'none';
    });
}
searchInput.addEventListener('input', (e) => {
    const tab = document.querySelector('.nav-item.active')?.dataset.tab;
    // Фильтруем только если активна вкладка "all"
    if (tab === 'all') {
        filterLists(e.target.value);
    }
});


// Функция для загрузки видео
async function uploadVideo(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        formData.append('folder', 'viagramka/videos');
        formData.append('resource_type', 'video'); // Важно для видео

        fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.secure_url) {
                resolve(data.secure_url);
            } else {
                reject(data.error?.message || 'Ошибка загрузки видео');
            }
        })
        .catch(reject);
    });
}

    function compressImage(file, quality) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            img.onload = () => {
                let w = img.width, h = img.height;
                const max = quality === 0.7 ? 1200 : 1920;
                if (w > max || h > max) {
                    const r = Math.min(max / w, max / h);
                    w = Math.floor(w * r);
                    h = Math.floor(h * r);
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                canvas.toBlob(blob => resolve({ blob }), 'image/jpeg', quality);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

function uploadCompressedImage(blob) {
  return new Promise((resolve, reject) => {
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    uploadToCloudinary(file)
      .then(resolve)
      .catch(reject);
  });
}

    // ========== VOICE RECORDING ==========
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioRecorder = new MediaRecorder(stream);
            audioChunks = [];
            audioRecorder.ondataavailable = e => e.data.size && audioChunks.push(e.data);
            audioRecorder.onstop = async () => {
                const blob = new Blob(audioChunks, { type: 'audio/webm' });
                await sendAudio(blob);
                stream.getTracks().forEach(t => t.stop());
            };
            audioRecorder.start();
            isRecording = true;
            if (voiceMessageBtn) voiceMessageBtn.style.background = 'var(--error)';
        } catch (err) {
            showNotification("Нет доступа к микрофону", "error");
        }
    }

    function stopRecording() {
        if (audioRecorder && isRecording) {
            audioRecorder.stop();
            isRecording = false;
            if (voiceMessageBtn) voiceMessageBtn.style.background = '';
        }
    }

    async function sendAudio(blob) {
        if (!currentChat) return;
        const url = URL.createObjectURL(blob);
        const duration = await getAudioDuration(url);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const audioUrl = e.target.result;
            const msgObj = {
                audioUrl,
                duration,
                senderId: currentUser.uid,
                senderName: currentUser.nickname,
                
                timestamp: Date.now(),
                read: false
            };
            if (currentChat.type === 'friend') {
                const chatId = getChatId(currentUser.uid, currentChat.id);
                await db.ref("messages/" + chatId).push(msgObj);
            } else if (currentChat.type === 'channel') {
                await db.ref("channelMessages/" + currentChat.id).push(msgObj);
            }
        };
        reader.readAsDataURL(blob);
    }

    function getAudioDuration(url) {
        return new Promise(resolve => {
            audioPlayer.src = url;
            audioPlayer.onloadedmetadata = () => resolve(audioPlayer.duration);
            audioPlayer.onerror = () => resolve(0);
        });
    }

    function playAudioMessage(url, el) {
        if (audioPlayer.src === url && !audioPlayer.paused) {
            audioPlayer.pause();
            return;
        }
        audioPlayer.src = url;
        audioPlayer.play();
        const progress = el.querySelector('.progress');
        audioPlayer.ontimeupdate = () => progress.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + '%';
        audioPlayer.onended = () => progress.style.width = '0';
    }

    // ========== IMAGE MODAL ==========
    window.showImageModal = (url) => {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.style.background = 'rgba(0,0,0,0.95)';
        modal.innerHTML = `<img src="${url}" style="max-width:90%; max-height:90%; border-radius:12px;">`;
        modal.onclick = () => modal.remove();
        document.body.appendChild(modal);
    };

    // ========== SCROLL TO MESSAGE ==========
    function scrollToMessage(id) {
        const el = document.querySelector(`[data-message-id="${id}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlight');
            setTimeout(() => el.classList.remove('highlight'), 2000);
        }
    }

    // ========== SHOW CONFIRM ==========
    function showConfirm(title, message, callback) {
        confirmTitle.textContent = title;
        confirmMessage.textContent = message;
        confirmOkBtn.onclick = () => { callback(); hideModal(confirmModal); };
        confirmCancelBtn.onclick = () => hideModal(confirmModal);
        showModal(confirmModal);
    }

    // ========== CHAT INFO ==========
   function showChatInfo() {
    if (!currentChat) return;

    const isMe = (currentChat.id === currentUser.uid);

    if (isMe) {
        profileAvatarPreview.src = currentUser.avatar || DEFAULT_AVATAR;
        profileNickname.value = currentUser.nickname || '';
        profileDescription.value = currentUser.description || '';
        showModal(profileModal);
        return;
    }

    const isFriend = currentChat.type === 'friend';
    chatInfoTitle.textContent = isFriend ? 'Информация о чате' : 'О канале';
    const shareBtnHtml = document.createElement('div');
    shareBtnHtml.style.marginTop = '15px';
    shareBtnHtml.style.textAlign = 'center';
    const profileLink = `${window.location.origin}/user.html?id=${currentChat.id}`;

    if (isFriend) {
        db.ref("users/" + currentChat.id).once("value").then(snap => {
            const user = snap.val();
            if (!user) return;

            let verifiedBadge = '';
            if (user.verified === 1) verifiedBadge = `<div style="color:#2196F3;">Официальный</div>`;
            else if (user.verified === 2) verifiedBadge = `<div class="zgs-badge" onclick="window.open('https://zoro-game.store/')">Сотрудничество ZGS</div>`;

            chatInfoContent.innerHTML = `
                <div style="text-align:center;">
                    <img src="${user.avatar || DEFAULT_AVATAR}" style="width:100px; height:100px; border-radius:23%; object-fit: cover;">
                    <h3>${sanitize(user.nickname)}</h3>
                    <p>${user.description || ''}</p>
                    <p>Статус: ${user.online ? 'в сети' : 'вышел из сети'}</p>
                    ${verifiedBadge}
                </div>
                ${blockedUsers[currentChat.id] ? 
                    `<button class="modal-btn" onclick="unblockUser('${currentChat.id}')">Разблокировать</button>` :
                    `<button class="modal-btn" onclick="blockUser('${currentChat.id}')">Заблокировать</button>
                     <button class="modal-btn" onclick="navigator.clipboard.writeText('${profileLink}').then(() => showNotification('Ссылка скопирована!', 'success'))">Скопировать ссылку</button>
                     <button class="modal-btn" onclick="removeFriend('${currentChat.id}')">Удалить из друзей</button>`}
            `;
            showModal(chatInfoModal);
        });
    } else {
        db.ref("channels/" + currentChat.id).once("value").then(snap => {
            const channel = snap.val();
            if (!channel) return;

            let creator = channel.createdBy === currentUser.uid ? 'Вы' : 'Неизвестно';
            db.ref("users/" + channel.createdBy).once("value").then(cs => {
                if (cs.val()) creator = cs.val().nickname;
            });

            let verifiedBadge = '';
            if (channel.verified === 1) verifiedBadge = `<div style="color:#2196F3;">Официальный</div>`;
            else if (channel.verified === 2) verifiedBadge = `<div class="zgs-badge" onclick="window.open('https://zoro-game.store/')">Сотрудничество с Zoro Игровой Магазин</div>`;

            const isGroup = channel.type === 'group';
            chatInfoContent.innerHTML = `
                <div style="text-align:center;">
                    <img src="${channel.avatar || DEFAULT_AVATAR}" style="width:100px; height:100px; border-radius:23%; object-fit: cover;">
                    <h3>${sanitize(channel.name)}</h3>
                    <p>${channel.description || ''}</p>
                    <p>${isGroup ? 'Группа' : 'Канал'}</p>
                    <p>${isGroup ? 'Участников' : 'Подписчиков'}: ${channel.members ? Object.keys(channel.members).length : 0}</p>
                    ${verifiedBadge}
                </div>
                ${channel.createdBy === currentUser.uid ?
                    `<button class="modal-btn"  onclick="showChannelSettings()">Настройки</button>
                     <button class="modal-btn" onclick="inviteToChannel(); showNotification('Ссылка скопирована!', 'success');">Пригласить по ссылке</button>
                     <button class="modal-btn" onclick="deleteChannel('${currentChat.id}')">Удалить</button>` :
                    `<button class="modal-btn" onclick="leaveChannel('${currentChat.id}')">Покинуть</button>
					<button class="modal-btn" onclick="inviteToChannel(); showNotification('Ссылка скопирована!', 'success');">Пригласить по ссылке</button>`}
            `;
            showModal(chatInfoModal);
        });
    }
    
    if (currentChat.type === 'friend') {
        shareBtnHtml.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
    } else {
        shareBtnHtml.innerHTML = `
            <button class="modal-btn primary" onclick="inviteToChannel(); hideModal(chatInfoModal)">
                🔗 Пригласить по ссылке
            </button>
        `;
    }
    
    // Исправлено: добавляем shareBtnHtml только если это канал
    if (currentChat.type !== 'friend') {
        document.getElementById('chatInfoContent').appendChild(shareBtnHtml);
    }
}
function showChannelSettings() {
    updateParamsInProfileSettings();
}
function showOtherUserInfo(userId) {
    // Проверяем, что userId передан
    if (!userId) {
        showNotification("ID пользователя не указан", "error");
        return;
    }

    // Загружаем информацию о пользователе
    db.ref("users/" + userId).once("value").then(snap => {
        const user = snap.val();
        if (!user) {
            showNotification("Пользователь не найден", "error");
            return;
        }

        // Проверяем, не является ли это текущим пользователем
        if (currentUser && userId === currentUser.uid) {
            // Показываем свой профиль
            profileAvatarPreview.src = currentUser.avatar || DEFAULT_AVATAR;
            profileNickname.value = currentUser.nickname || '';
            profileDescription.value = currentUser.description || '';
            showModal(profileModal);
            return;
        }

        // Создаем или обновляем контент для модального окна
        chatInfoTitle.textContent = 'Информация о пользователе';
        
        let verifiedBadge = '';
        if (user.verified === 1) verifiedBadge = `<div style="color:#2196F3;">Официальный</div>`;
        else if (user.verified === 2) verifiedBadge = `<div class="zgs-badge" onclick="window.open('https://zoro-game.store/')">Сотрудничество ZGS</div>`;

        const profileLink = `${window.location.origin}/user.html?id=${userId}`;

        // Проверяем, есть ли пользователь в друзьях
        if (currentUser) {
            db.ref("friends/" + currentUser.uid + "/" + userId).once("value").then(friendSnap => {
                const isFriend = friendSnap.exists();
                
                // Проверяем, заблокирован ли пользователь
                const isBlocked = blockedUsers[userId] || false;

                // Формируем HTML
                let actionButtons = '';

                if (currentUser) {
                    if (isFriend) {
                        actionButtons = `
                            <button class="modal-btn" onclick="removeFriend('${userId}')">Удалить из друзей</button>
                            <button class="modal-btn" onclick="openChat('friend', '${userId}', '${sanitize(user.nickname)}', '${user.avatar || DEFAULT_AVATAR}'); hideModal(chatInfoModal)">Написать сообщение</button>
                        `;
                    } else {
                        actionButtons = `
                            <button class="modal-btn primary" onclick="addFriendById('${userId}', '${sanitize(user.nickname)}')">Добавить в друзья</button>
                            <button class="modal-btn" onclick="openChat('friend', '${userId}', '${sanitize(user.nickname)}', '${user.avatar || DEFAULT_AVATAR}'); hideModal(chatInfoModal)">Написать сообщение</button>
                        `;
                    }

                    if (isBlocked) {
                        actionButtons += `<button class="modal-btn" onclick="unblockUser('${userId}')">Разблокировать</button>`;
                    } else {
                        actionButtons += `<button class="modal-btn" onclick="blockUser('${userId}')">Заблокировать</button>`;
                    }
                }

                chatInfoContent.innerHTML = `
                    <div style="text-align:center;">
                        <img src="${user.avatar || DEFAULT_AVATAR}" style="width:100px; height:100px; border-radius:23%; object-fit: cover; margin-bottom: 10px;">
                        <h3 style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                            ${sanitize(user.nickname)}
                            ${verifiedBadge}
                        </h3>
                        <p style="margin: 10px 0; color: var(--text-secondary);">${user.description || 'Нет описания'}</p>
                        <p style="margin: 5px 0;">
                            <span class="status-dot ${user.online ? 'в сети' : 'вышел из сети'}" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${user.online ? '#4CAF50' : '#757575'}; margin-right: 5px;"></span>
                            ${user.online ? 'В сети' : 'Не в сети'}
                        </p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 20px;">
                        ${actionButtons}
                        <button class="modal-btn secondary" onclick="copyToClipboard('${profileLink}')">
                            Скопировать ссылку на профиль
                        </button>
                    </div>
                `;
                
                showModal(chatInfoModal);
            });
        } else {
            // Если пользователь не авторизован
            chatInfoContent.innerHTML = `
                <div style="text-align:center;">
                    <img src="${user.avatar || DEFAULT_AVATAR}" style="width:100px; height:100px; border-radius:23%; object-fit: cover; margin-bottom: 10px;">
                    <h3>${sanitize(user.nickname)}</h3>
                    <p style="margin: 10px 0; color: var(--text-secondary);">${user.description || 'Нет описания'}</p>
                    <p style="margin: 5px 0;">${user.online ? 'в сети' : 'вышел из сети'}</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 20px;">
                    <button class="modal-btn primary" onclick="showModal(authModal); hideModal(chatInfoModal)">
                        Войти, чтобы добавить в друзья
                    </button>
                </div>
            `;
            
            showModal(chatInfoModal);
        }
    }).catch(error => {
        console.error("Ошибка загрузки пользователя:", error);
        showNotification("Ошибка загрузки данных пользователя", "error");
    });
}


    function updateParamsInProfileSettings() {
    if (!currentChat || currentChat.type !== 'channel') {
        showNotification("Это не канал", "error");
        return;
    }
    
    // Загружаем данные канала
    db.ref("channels/" + currentChat.id).once("value").then(snap => {
        const channel = snap.val();
        if (!channel) {
            showNotification("Канал не найден", "error");
            return;
        }
        
        // Проверяем, является ли пользователь создателем
        if (channel.createdBy !== currentUser.uid) {
            showNotification("Только создатель может настроить канал", "error");
            return;
        }
        
        // Заполняем поля в модальном окне настроек
        channelNameInput.value = channel.name || '';
        channelDescriptionInput.value = channel.description || '';
        channelSettingsAvatarPreview.src = channel.avatar || DEFAULT_AVATAR;
        
        // Показываем модальное окно
        showModal(channelSettingsModal);
    }).catch(error => {
        console.error("Ошибка загрузки канала:", error);
        showNotification("Ошибка загрузки данных канала", "error");
    });
}
// Добавьте эту функцию для сохранения настроек канала
async function saveChannelSettings() {
    if (!currentChat || currentChat.type !== 'channel') {
        showNotification("Это не канал", "error");
        return;
    }
    
    const name = channelNameInput.value.trim();
    const description = channelDescriptionInput.value.trim();
    const avatarFile = channelSettingsAvatarUpload.files[0];
    
    if (!name) {
        channelSettingsError.textContent = "Введите название канала";
        return;
    }
    
    try {
        let avatarUrl = channelSettingsAvatarPreview.src;
        
        // Если загружен новый аватар
        if (avatarFile) {
            showNotification("Загружаем аватар...", "info");
            avatarUrl = await new Promise((resolve, reject) => {
                uploadImageToFreeImageHost(avatarFile, (err, url) => {
                    if (err) reject(err);
                    else resolve(url);
                });
            });
        }
        
        // Обновляем данные канала
        const updates = {
            name: name,
            description: description || "",
            avatar: avatarUrl
        };
        
        await db.ref("channels/" + currentChat.id).update(updates);
        
        // Обновляем информацию в текущем чате
        if (currentChat) {
            currentChat.name = name;
            currentChat.avatar = avatarUrl;
            chatName.textContent = name;
            chatAvatar.src = avatarUrl;
        }
        
        hideModal(channelSettingsModal);
        showNotification("Настройки канала сохранены", "success");
        
    } catch (error) {
        console.error("Ошибка сохранения настроек канала:", error);
        channelSettingsError.textContent = "Ошибка сохранения: " + error.message;
    }
}

    function inviteToChannel() {
        if (!currentChat) {
            showNotification("Сначала выберите чат", "error");
            return;
        }
        if (currentChat.type === 'friend') {
            showNotification("Нельзя пригласить в личный чат", "info");
            return;
        }

        const channelType = currentChat.type;
        const path = window.location.pathname;
        const basePath = path.substring(0, path.lastIndexOf('/') + 1);
        const baseUrl = window.location.origin + basePath;
        const inviteLink = `${baseUrl}join.html?type=${channelType}&id=${currentChat.id}`;

        navigator.clipboard.writeText(inviteLink).then(() => {
            showNotification('Ссылка скопирована!', 'success');
        }).catch(() => {
            showNotification('Не удалось скопировать ссылку', 'error');
        });
    }

    async function blockUser(id) {
        await db.ref(`blockedUsers/${currentUser.uid}/${id}`).set(true);
        blockedUsers[id] = true;
        hideModal(chatInfoModal);
        showNotification("Пользователь заблокирован", "success");
    }

    async function unblockUser(id) {
        await db.ref(`blockedUsers/${currentUser.uid}/${id}`).remove();
        delete blockedUsers[id];
        hideModal(chatInfoModal);
        showNotification("Пользователь разблокирован", "success");
    }

    async function removeFriend(id) {
        await db.ref(`friends/${currentUser.uid}/${id}`).remove();
        await db.ref(`friends/${id}/${currentUser.uid}`).remove();
        hideModal(chatInfoModal);
        showNotification("Друг удалён", "success");
    }

    async function deleteChannel(id) {
        await db.ref(`channels/${id}`).remove();
        await db.ref(`channelMessages/${id}`).remove();
        await db.ref(`channelComments/${id}`).remove(); // remove all comments for this channel
        hideModal(chatInfoModal);
        showNotification("Канал удалён", "success");
    }

    async function leaveChannel(id) {
        await db.ref(`channels/${id}/members/${currentUser.uid}`).remove();
        hideModal(chatInfoModal);
        showNotification("Вы покинули канал", "success");
    }

    // ========== ADD FRIEND ==========
    async function addFriend(nickname) {
        if (!nickname) {
            addFriendError.textContent = "Введите ник";
            return false;
        }
        if (nickname === currentUser.nickname) {
            addFriendError.textContent = "Нельзя добавить себя";
            return false;
        }
        try {
            const snap = await db.ref("users").orderByChild("nickname").equalTo(nickname).once("value");
            if (!snap.exists()) {
                addFriendError.textContent = "Пользователь не найден";
                return false;
            }
            let friendId;
            snap.forEach(s => friendId = s.key);
            const check = await db.ref(`friends/${currentUser.uid}/${friendId}`).once("value");
            if (check.exists()) {
                addFriendError.textContent = "Уже в друзьях";
                return false;
            }
            await db.ref(`friends/${currentUser.uid}/${friendId}`).set(true);
            await db.ref(`friends/${friendId}/${currentUser.uid}`).set(true);
            return true;
        } catch (err) {
            addFriendError.textContent = "Ошибка";
            return false;
        }
    }

    // ========== CREATE CHANNEL ==========
    async function createChannel(name, description, avatarFile, type, isPrivate) {
        if (!name) {
            createChannelError.textContent = "Введите название";
            return false;
        }
        try {
            const check = await db.ref("channels").orderByChild("name").equalTo(name).once("value");
            if (check.exists()) {
                createChannelError.textContent = "Канал с таким именем уже существует";
                return false;
            }
            let avatarUrl = DEFAULT_AVATAR;
            if (avatarFile) {
                avatarUrl = await new Promise((resolve, reject) => {
                    uploadImageToFreeImageHost(avatarFile, (err, url) => {
                        if (err) reject(err);
                        else resolve(url);
                    });
                });
            }
            const channelRef = db.ref("channels").push();
            await channelRef.set({
                name,
                description: description || "",
                avatar: avatarUrl,
                type: type || 'channel',
                private: isPrivate || false,
                createdBy: currentUser.uid,
                createdAt: Date.now(),
                members: { [currentUser.uid]: true }
            });
            return true;
        } catch (err) {
            console.error(err);
            createChannelError.textContent = "Ошибка создания";
            return false;
        }
    }

function uploadImageToFreeImageHost(file, callback) {
  uploadToCloudinary(file)
    .then(url => callback(null, url))
    .catch(err => callback(err.message || 'Ошибка загрузки'));
}

    // ========== UPDATE PROFILE ==========
    async function updateProfile(nickname, description, avatarFile) {
        if (!nickname) {
            profileError.textContent = "Введите никнейм";
            return false;
        }
        if (avatarFile && avatarFile.size > 10 * 1024 * 1024) {
            profileError.textContent = "Файл слишком большой (макс. 10 МБ)";
            return false;
        }
        try {
            const updates = { nickname, description: description || "Привет! я использую Viagram!" };
            if (avatarFile) {
                const avatarUrl = await new Promise((resolve, reject) => {
                    uploadImageToFreeImageHost(avatarFile, (err, url) => {
                        if (err) reject(err);
                        else resolve(url);
                    });
                });
                updates.avatar = avatarUrl;
                currentUser.avatar = avatarUrl;
                userAvatar.src = avatarUrl;
            }
            await db.ref("users/" + currentUser.uid).update(updates);
            currentUser.nickname = nickname;
            profileError.textContent = "";
            return true;
        } catch (err) {
            console.error(err);
            profileError.textContent = "Ошибка сохранения";
            return false;
        }
    }

    // ========== SELF CHAT ==========
    function createSelfChat() {
        if (!currentUser) return;
        const selfChatId = getChatId(currentUser.uid, currentUser.uid);
        db.ref("messages/" + selfChatId).limitToLast(1).once("value", snap => {
            const hasMsg = snap.exists();
            openChat("friend", currentUser.uid, "Я", currentUser.avatar);
            if (!hasMsg) {
                setTimeout(() => {
                    db.ref("messages/" + selfChatId).push({
                        text: "Это избранное. Здесь можно сохранять заметки.",
                        senderId: currentUser.uid,
                        senderName: "Я",
                        
                        timestamp: Date.now() - 1000,
                        read: true
                    });
                }, 500);
            }
        });
    }

    // ========== LOAD USER SETTINGS ==========
    async function loadUserSettings(uid) {
        const snap = await db.ref("userSettings/" + uid).once("value");
        const s = snap.val() || {};
        if (s.autoCorrectEnabled !== undefined) autoCorrectEnabled = s.autoCorrectEnabled;
        if (s.theme) { currentTheme = s.theme; applyTheme(currentTheme); }
        if (s.colorTheme) { currentColorTheme = s.colorTheme; applyColorTheme(currentColorTheme); }
        if (s.textSize) { textSizeSlider.value = s.textSize; applyTextSize(s.textSize); }
        if (s.messageTextSize) { messageTextSizeSlider.value = s.messageTextSize; applyMessageTextSize(s.messageTextSize); }
        if (s.messageRadius) { messageRadiusSlider.value = s.messageRadius; applyBorderRadius(s.messageRadius); }
        if (s.privacy) privacySettings = { ...privacySettings, ...s.privacy };
        if (s.language) currentLanguage = s.language;
    }

    // Функция для открытия чата по ID из URL
    async function openChatFromUrl(chatId) {
        if (!chatId) return;

        try {
            const userSnap = await db.ref('users/' + chatId).once('value');
            if (userSnap.exists()) {
                const user = userSnap.val();
                openChat('friend', chatId, user.nickname || 'Пользователь', user.avatar);
                return;
            }

            const channelSnap = await db.ref('channels/' + chatId).once('value');
            if (channelSnap.exists()) {
                const channel = channelSnap.val();
                openChat('channel', chatId, channel.name || 'Канал', channel.avatar);
                return;
            }

            showNotification('Чат не найден', 'error');
        } catch (error) {
            console.error('Ошибка при открытии чата по ссылке:', error);
            showNotification('Не удалось открыть чат', 'error');
        }
    }

    // ========== CHECK SERVER STATUS ==========
    function checkServerStatus() {
        db.ref(".info/connected").on("value", snap => {
            serverOffline.style.display = snap.val() ? 'none' : 'flex';
        });
    }

    // ========== INIT ==========
    function init() {
        checkServerStatus();
        const savedTheme = localStorage.getItem('theme');
        const savedColor = localStorage.getItem('colorTheme');
        if (savedTheme) { currentTheme = savedTheme; themeToggle.checked = currentTheme === 'light'; applyTheme(currentTheme); }
        if (savedColor) { currentColorTheme = savedColor; applyColorTheme(currentColorTheme); }
		setTimeout(() => {
		initEmojiPicker();
        showChannels();
    }, 100);
    }
// ========== PWA FUNCTIONS ==========

// Регистрация Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('[PWA] Service Worker зарегистрирован:', registration.scope);
          
          // Проверка обновлений
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('[PWA] Новое обновление найдено');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Новый Service Worker установлен, показываем уведомление о перезагрузке
                showUpdateNotification();
              }
            });
          });
        })
        .catch(error => {
          console.error('[PWA] Ошибка регистрации Service Worker:', error);
        });
    });
  }
}

// Уведомление о доступном обновлении
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'notification info';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 16px;
    right: 16px;
    background: var(--bg-secondary);
    border-radius: 16px;
    padding: 16px;
    border-left: 4px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 3000;
    animation: slideUp 0.3s ease;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)">
        <path d="M21 6h-2v2h-2V6h-2V4h2V2h2v2h2v2zm-6-4v2h-2V2h2zm0 8h-2v2h2v-2zm-4-4H9v2h2V6zm0 8H9v2h2v-2zm-4-4H5v2h2v-2zm12 4h-2v-2h-2v2h2v2h-2v2h2v-2h2v-2zM4 4h8v2H4v12h12v-6h2v8H2V4h2z"/>
      </svg>
      <div>
        <strong>Доступно обновление!</strong>
        <p style="margin: 4px 0 0; font-size: 12px; color: var(--text-secondary);">Новая версия приложения готова</p>
      </div>
    </div>
    <button onclick="applyUpdate()" style="background: var(--primary); color: white; border: none; border-radius: 20px; padding: 8px 16px; font-weight: 600; cursor: pointer;">
      Обновить
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Удаляем через 30 секунд
  setTimeout(() => {
    notification.remove();
  }, 30000);
}

// Применение обновления
window.applyUpdate = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration.waiting) {
        // Отправляем сообщение Service Worker для пропуска ожидания
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
  
  // Перезагружаем страницу
  window.location.reload();
};

// Обработка сообщений от Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.type === 'UPDATE_AVAILABLE') {
      showUpdateNotification();
    }
  });
}

// Функция для проверки подключения к интернету
window.addEventListener('online', () => {
  showNotification('Соединение восстановлено', 'success');
  document.getElementById('serverOffline').style.display = 'none';
});

window.addEventListener('offline', () => {
  showNotification('Нет подключения к интернету', 'warning');
  document.getElementById('serverOffline').style.display = 'flex';
});

// Функция для добавления на главный экран
function showAddToHomeScreen() {
  // Проверяем, не установлено ли уже приложение
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return; // Уже установлено
  }
  
  // Проверяем, показывали ли уже уведомление
  if (localStorage.getItem('addToHomeScreenShown')) {
    return;
  }
  
  // Показываем уведомление через 30 секунд после загрузки
  setTimeout(() => {
    // Проверяем для разных браузеров
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS || isAndroid) {
      const notification = document.createElement('div');
      notification.className = 'notification info';
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 16px;
        right: 16px;
        background: var(--bg-secondary);
        border-radius: 16px;
        padding: 16px;
        border-left: 4px solid var(--primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 3000;
        animation: slideUp 0.3s ease;
        max-width: 400px;
        margin: 0 auto;
      `;
      
      const message = isIOS 
        ? 'Нажмите "Поделиться" → "На экран "Домой"' 
        : 'Нажмите "Установить приложение" в меню браузера';
      
      notification.innerHTML = `
        
      `;
      
      document.body.appendChild(notification);
    }
  }, 30000);
}

// Инициализация PWA
function initPWA() {
  registerServiceWorker();
  showAddToHomeScreen();
  
  // Обновляем тему при изменении
  const observer = new MutationObserver(() => {
    if (document.querySelector('meta[name="theme-color"]')) {
      const themeColor = document.querySelector('meta[name="theme-color"]');
      themeColor.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6C63FF');
    }
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Запускаем PWA инициализацию после загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPWA);
} else {
  initPWA();
}

    // ========== COMMENTS FUNCTIONS ==========
    // (NEW)
    async function showComments(messageId) {
        if (!currentChat || currentChat.type !== 'channel') {
            showNotification('Комментарии доступны только в каналах', 'error');
            return;
        }
        // Load the message data
        const msgSnap = await db.ref(`channelMessages/${currentChat.id}/${messageId}`).once('value');
        const messageData = msgSnap.val();
        if (!messageData) {
            showNotification('Сообщение не найдено', 'error');
            return;
        }
        currentCommentMessage = { id: messageId, ...messageData };
        commentsModalTitle.textContent = `Комментарии к посту`;
        commentInput.value = '';
        replyToComment = null;
        replyToCommentContainer.classList.add('hidden');

        loadComments(currentChat.id, messageId);
        showModal(commentsModal);
    }

    function loadComments(channelId, messageId) {
        if (currentCommentsListener) {
            db.ref(`channelComments/${channelId}/${messageId}`).off('value', currentCommentsListener);
        }

        const commentsRef = db.ref(`channelComments/${channelId}/${messageId}`);

        currentCommentsListener = commentsRef.on('value', (snapshot) => {
            const comments = snapshot.val() || {};
            renderComments(comments);
        });
    }

    function renderComments(commentsObj) {
        if (!commentsList) return;

        const commentsArray = Object.entries(commentsObj).map(([key, val]) => ({ key, ...val }));
        commentsArray.sort((a, b) => a.timestamp - b.timestamp);

        if (commentsArray.length === 0) {
            commentsList.innerHTML = '<div class="empty-state">Нет комментариев. Напишите первый!</div>';
            return;
        }

        let html = '';
        commentsArray.forEach(comment => {
            html += renderCommentHTML(comment);
        });
        commentsList.innerHTML = html;
    }

    function renderCommentHTML(comment) {
        const timeStr = formatTime(comment.timestamp);
        const isOwner = comment.senderId === currentUser?.uid;

        let replyBlock = '';
        if (comment.replyTo) {
            replyBlock = `<div class="reply-indicator" onclick="jumpToComment('${comment.replyTo}')">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                в ответ
            </div>`;
        }

        const deleteBtn = isOwner ? `<button class="comment-delete-btn" onclick="deleteComment('${comment.key}')">Удалить</button>` : '';

        return `
            <div class="comment-item" id="comment-${comment.key}">
                
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${sanitize(comment.senderName)}</span>
                        <span class="comment-time">${timeStr}</span>
                    </div>
                    ${replyBlock}
                    <div class="comment-text">${parseMarkdown(comment.text)}</div>
                    <div class="comment-footer">
                        <button class="comment-reply-btn" onclick="setReplyToComment('${comment.key}', '${sanitize(comment.senderName)}', '${sanitize(comment.text)}')">Ответить</button>
                        ${deleteBtn}
                    </div>
                </div>
            </div>
        `;
    }

    function setReplyToComment(commentId, senderName, commentText) {
        replyToComment = { id: commentId, senderName, text: commentText };
        replyToCommentName.textContent = senderName;
        replyToCommentText.textContent = commentText;
        replyToCommentContainer.classList.remove('hidden');
        commentInput.focus();
    }

    function cancelCommentReply() {
        replyToComment = null;
        replyToCommentContainer.classList.add('hidden');
    }

    async function sendComment() {
        const text = commentInput.value.trim();
        if (!text || !currentChat || !currentCommentMessage) return;

        const commentObj = {
            text: text,
            senderId: currentUser.uid,
            senderName: currentUser.nickname,
            
            timestamp: Date.now(),
            replyTo: replyToComment ? replyToComment.id : null
        };

        try {
            await db.ref(`channelComments/${currentChat.id}/${currentCommentMessage.id}`).push(commentObj);
            commentInput.value = '';
            cancelCommentReply();
            updateCommentCount(currentChat.id, currentCommentMessage.id);
        } catch (error) {
            showNotification('Ошибка отправки комментария', 'error');
        }
    }

    async function deleteComment(commentKey) {
        if (!currentChat || !currentCommentMessage) return;
        showConfirm('Удаление', 'Удалить комментарий?', async () => {
            try {
                await db.ref(`channelComments/${currentChat.id}/${currentCommentMessage.id}/${commentKey}`).remove();
                showNotification('Комментарий удалён', 'success');
                updateCommentCount(currentChat.id, currentCommentMessage.id);
            } catch (error) {
                showNotification('Ошибка удаления', 'error');
            }
        });
    }

    async function updateCommentCount(channelId, messageId) {
        const snapshot = await db.ref(`channelComments/${channelId}/${messageId}`).once('value');
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

        const messageRef = db.ref(`channelMessages/${channelId}/${messageId}`);
        await messageRef.update({ commentCount: count });
    }

    function jumpToComment(commentId) {
        const el = document.getElementById(`comment-${commentId}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlight');
            setTimeout(() => el.classList.remove('highlight'), 2000);
        }
    }

backToChats.addEventListener('click', () => {
    document.getElementById('chatsPage').classList.add('active');
    document.getElementById('chatPage').classList.remove('active');
    if (currentChatRef) currentChatRef.off();
    currentChat = null;
    chatMessages.innerHTML = '';
    emptyMessage = false;
	 document.getElementById("currentPageTitle").style.display = 'block';
	  document.getElementById("currentPageTitle").style.display = 'flex';
    // Удаляем заглушку
    removeEmptyChatMessage();
    
    chatName.textContent = "Выберите чат";
    chatAvatar.src = DEFAULT_AVATAR;
    chatStatus.textContent = '';
    messageInput.disabled = true;
    sendBtn.disabled = true;
    hidePhotoPreview();
    if (isReplying) cancelReply();
    if (isEditing) cancelEdit();
    messageInput.style.display = 'none';
    sendBtn.style.display = 'none';
    attachBtn.style.display = 'none';
    formatToolbar.style.display = 'none';
    audioUnlocked = false;
});

    
    closeSettingsBtn.addEventListener('click', () => hideModal(settingsModal));

    settingsCategories.forEach(cat => {
        cat.addEventListener('click', () => {
            hideModal(settingsModal);
            const target = cat.dataset.category;
            if (target === 'appearance') showModal(appearanceSettingsModal);
            else if (target === 'privacy') showModal(privacySettingsModal);
            else if (target === 'language') showModal(languageSettingsModal);
            else if (target === 'system') showModal(systemSettingsModal);
        });
    });

    closeAppearanceSettingsBtn.addEventListener('click', () => { hideModal(appearanceSettingsModal); showModal(settingsModal); });
    closePrivacySettingsBtn.addEventListener('click', () => { hideModal(privacySettingsModal); showModal(settingsModal); });
    closeLanguageSettingsBtn.addEventListener('click', () => { hideModal(languageSettingsModal); showModal(settingsModal); });
    closeSystemSettingsBtn.addEventListener('click', () => { hideModal(systemSettingsModal); showModal(settingsModal); });

    themeToggle.addEventListener('change', (e) => {
        currentTheme = e.target.checked ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    themeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            applyColorTheme(opt.dataset.theme);
            localStorage.setItem('colorTheme', opt.dataset.theme);
        });
    });

    textSizeSlider.addEventListener('input', () => applyTextSize(textSizeSlider.value));
    messageTextSizeSlider.addEventListener('input', () => applyMessageTextSize(messageTextSizeSlider.value));
    messageRadiusSlider.addEventListener('input', () => applyBorderRadius(messageRadiusSlider.value));

    userAvatar.addEventListener('click', () => {
        if (!currentUser) { showModal(authModal); return; }
        profileAvatarPreview.src = currentUser.avatar || DEFAULT_AVATAR;
        profileNickname.value = currentUser.nickname || '';
        profileDescription.value = currentUser.description || '';
        showModal(profileModal);
    });
    function showProfileSettings(){
       
        profileAvatarPreview.src = currentUser.avatar || DEFAULT_AVATAR;
        profileNickname.value = currentUser.nickname || '';
        profileDescription.value = currentUser.description || '';
        showModal(profileModal);
    }
    closeProfileBtn.addEventListener('click', () => hideModal(profileModal));
    logoutBtn.addEventListener('click', () => {
        showConfirm("Выход", "Вы уверены?", () => {
            auth.signOut();
            hideModal(profileModal);
        });
    });

    saveProfileBtn.addEventListener('click', async () => {
        const file = avatarUpload.files[0];
        const ok = await updateProfile(profileNickname.value.trim(), profileDescription.value.trim(), file);
        showNotification("Подождите, применяем...");
        if (ok) hideModal(profileModal);
    });

    avatarUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => profileAvatarPreview.src = ev.target.result;
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    addFriendBtn.addEventListener('click', () => {
        addFriendInput.value = '';
        addFriendError.textContent = '';
        showModal(addFriendModal);
    });

    confirmAddFriendBtn.addEventListener('click', async () => {
        if (await addFriend(addFriendInput.value.trim())) hideModal(addFriendModal);
    });

    cancelAddFriendBtn.addEventListener('click', () => hideModal(addFriendModal));

    createChannelBtn.addEventListener('click', () => {
        createChannelInput.value = '';
        createChannelDescription.value = '';
        channelAvatarPreview.src = DEFAULT_AVATAR;
        channelAvatarUpload.value = '';
        currentChannelType = 'channel';
        channelTypeOptions.forEach(o => o.classList.toggle('active', o.dataset.type === 'channel'));
        showModal(createChannelModal);
    });

    channelTypeOptions.forEach(opt => opt.addEventListener('click', () => {
        channelTypeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        currentChannelType = opt.dataset.type;
        createChannelTitle.textContent = opt.dataset.type === 'channel' ? 'Создать канал' : 'Создать группу';
    }));

    channelAvatarUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => channelAvatarPreview.src = ev.target.result;
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    confirmCreateChannelBtn.addEventListener('click', async () => {
        const file = channelAvatarUpload.files[0];
        if (currentChannelType === "group") {
            const ok = await createChannel(createChannelInput.value.trim(), createChannelDescription.value.trim(), file, currentChannelType, true);
            if (ok) hideModal(createChannelModal);
        } else {
            const ok = await createChannel(createChannelInput.value.trim(), createChannelDescription.value.trim(), file, currentChannelType, false);
            if (ok) hideModal(createChannelModal);
        }
    });

    cancelCreateChannelBtn.addEventListener('click', () => hideModal(createChannelModal));

    attachBtn.addEventListener('click', () => {
        if (!currentChat) { showNotification("Выберите чат", "error"); return; }
        photoInput.click();
    });
function callUser()
{
	if(chatStatus.textContent === "в сети")
	{
		showModal(callModal);
		callUsername.textContent = chatName.textContent;
		callStatus.textContent = "Соединение...";
	}
	else
	{
		showModal(callOfflineModal);
	}
}
photoInput.addEventListener('change', (e) => {
    if (!currentChat) { 
        showNotification("Выберите чат", "error"); 
        e.target.value = ''; 
        return; 
    }
    
    // Добавляем поддержку видео
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            showMediaPreview(file);
        } else {
            showNotification("Поддерживаются только изображения и видео", "error");
        }
    }
    
    e.target.value = '';
});

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('input', resizeTextarea);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); playSound(sendSound); audioUnlocked = false; sendMessage(); unlockAudio();}
    });

    messageInput.addEventListener('focus', () => {
        clearTimeout(blurTimeout);
        formatToolbar.style.display = 'flex';
    });

    messageInput.addEventListener('blur', (e) => {
        blurTimeout = setTimeout(() => {
            if (!formatToolbar.contains(document.activeElement)) {
                formatToolbar.style.display = 'none';
            }
        }, 200);
    });

    chatInfoBtn.addEventListener('click', console.log("nothing..."));
    closeChatInfoBtn.addEventListener('click', () => hideModal(chatInfoModal));

    confirmCancelBtn.addEventListener('click', () => hideModal(confirmModal));
    closeLockModalBtn.addEventListener('click', () => hideModal(lockModal));
    closeUpdatesBtn.addEventListener('click', () => hideModal(updatesModal));

    favoriteBtn.addEventListener('click', createSelfChat);
    

    // NEW: Comments event listeners
    sendCommentBtn.addEventListener('click', sendComment);
    closeCommentsBtn.addEventListener('click', () => {
        hideModal(commentsModal);
        if (currentCommentsListener && currentChat && currentCommentMessage) {
            db.ref(`channelComments/${currentChat.id}/${currentCommentMessage.id}`).off('value', currentCommentsListener);
            currentCommentsListener = null;
        }
    });
    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendComment();
        }
    });
    commentInput.addEventListener('input', () => {
        commentInput.style.height = 'auto';
        commentInput.style.height = Math.min(commentInput.scrollHeight, 100) + 'px';
    });

    // ========== AUTH ==========
    showRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); showNotification("Регистрироваться можно только через Гугл", 'warning'); });
    showLoginBtn.addEventListener('click', (e) => { e.preventDefault(); hideModal(registerModal); showModal(authModal); });

    loginBtn.addEventListener('click', async () => {
        if (!email.value || !password.value) { authError.textContent = "Заполните поля"; return; }
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
            hideModal(authModal);
        } catch (err) {
			
			if(err.message === "Firebase: The email address is badly formatted. (auth/invalid-email).")
			{
				showNotification("Неправильно написан email", 'error');
			}
			if(err.message === "Firebase: Error (auth/invalid-login-credentials).")
			{
				showNotification("Неверный email или пароль", 'error');
			}
			if(err.message === "Firebase: The user account has been disabled by an administrator. (auth/user-disabled).")
			{
				window.location.href = "https://viagramka.ru/yourAccountBlocked.html";
				
			}
		}
    });

    chatMessages.addEventListener('click', (e) => {
        const btn = e.target.closest('.reaction-btn');
        if (!btn) return;
        e.preventDefault();
        const messageDiv = btn.closest('.message');
        if (!messageDiv) return;
        const emoji = btn.dataset.emoji;
        if (emoji) {
            toggleReaction(messageDiv, emoji);
        }
    });

    googleLoginBtn.addEventListener('click', () => {
        auth.signInWithPopup(provider).catch(err => authError.textContent = err.message);
    });

    registerBtn.addEventListener('click', async () => {
        if (!regNickname.value || !regEmail.value || !regPassword.value) { registerError.textContent = "Заполните поля"; return; }
        if (regPassword.value.length < 6) { registerError.textContent = "Пароль минимум 6 символов"; return; }
        try {
            const check = await db.ref("users").orderByChild("nickname").equalTo(regNickname.value).once("value");
            if (check.exists()) { registerError.textContent = "Ник уже занят"; return; }
            const cred = await auth.createUserWithEmailAndPassword(regEmail.value, regPassword.value);
            await db.ref("users/" + cred.user.uid).set({
                nickname: regNickname.value,
                avatar: DEFAULT_AVATAR,
                description: "Привет! я использую Viagram!",
                online: true
            });
            hideModal(registerModal);
        } catch (err) { registerError.textContent = err.message; }
    });

    googleRegisterBtn.addEventListener('click', () => {
        auth.signInWithPopup(provider).then(async (result) => {
            const user = result.user;
            const snap = await db.ref("users/" + user.uid).once("value");
            if (!snap.exists()) {
                await db.ref("users/" + user.uid).set({
                    nickname: user.displayName || "Пользователь",
                    avatar: user.photoURL || DEFAULT_AVATAR,
                    description: "Привет! я использую Viagram!",
                    online: true
                });
            }
            hideModal(registerModal);
        }).catch(err => registerError.textContent = err.message);
    });

    // ========== AUTH STATE ==========
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const snap = await db.ref("users/" + user.uid).once("value");
            const data = snap.val() || {};
            currentUser = {
                uid: user.uid,
                email: user.email,
                nickname: data.nickname || "Пользователь",
                avatar: data.avatar || DEFAULT_AVATAR,
                description: data.description || "Привет! я использую Viagram!"
            };
            const blocked = await db.ref(`blockedUsers/${currentUser.uid}`).once("value");
            blockedUsers = blocked.val() || {};
            userAvatar.src = currentUser.avatar;
            updateOnlineStatus(currentUser.uid, true);
            window.addEventListener("beforeunload", () => updateOnlineStatus(currentUser.uid, false));
            await loadUserSettings(currentUser.uid);
            loadFriends();
            loadChannels();
            hideModal(authModal);
            hideModal(registerModal);
            if (chatIdFromUrl) {
                await openChatFromUrl(chatIdFromUrl);
            }
        } else {
            currentUser = null;
            blockedUsers = {};
            userAvatar.src = DEFAULT_AVATAR;
            friendsList.innerHTML = '';
            channelsList.innerHTML = '';
            chatMessages.innerHTML = '';
            chatName.textContent = "Выберите чат";
            chatAvatar.src = '';
            showModal(authModal);
        }
    });

    init();

    // ========== GLOBAL FUNCTIONS ==========
    window.showImageModal = showImageModal;
    window.downloadPhoto = (url) => { const a = document.createElement('a'); a.href = url; a.download = 'photo.jpg'; a.click(); };
    window.playAudioMessage = playAudioMessage;
    window.showContextMenu = showContextMenu;
    window.forwardMessage = forwardMessage;
    window.replyToMessage = replyToMessage;
	
    window.linkWithGoogle = linkWithGoogle;
    window.unlinkGoogle = unlinkGoogle;
    window.getGoogleLinkStatus = getGoogleLinkStatus;
    window.editMessage = editMessage;
    window.deleteMessage = deleteMessage;
    window.cancelReply = cancelReply;
    window.cancelEdit = cancelEdit;
	window.showChatInfo = showChatInfo;
    window.showOtherUserInfo = showOtherUserInfo;
    window.cancelDelete = cancelDelete;
    window.confirmDelete = confirmDelete;
    window.scrollToMessage = scrollToMessage;
    window.cancelPhotoUpload = cancelPhotoUpload;
    window.sendSelectedPhotos = sendSelectedPhotos;
    window.removePhoto = removePhoto;
    // NEW: Expose comment functions globally
    window.showComments = showComments;
    window.setReplyToComment = setReplyToComment;
    window.cancelCommentReply = cancelCommentReply;
    window.deleteComment = deleteComment;
    window.jumpToComment = jumpToComment;
