(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist,this.mainPlayList]); this.playList_0413EE58_08A6_E53D_4181_3FD171B81747.set('selectedIndex', 0)",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "layout": "absolute",
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "defaultVRPointer": "laser",
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "class": "Player",
 "paddingTop": 0,
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Player435"
 },
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -118.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05CA1FB7_08A6_E373_4177_0CC1001FA7F0",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_70294095_7CF2_AEA7_41B8_87E77BDF8CC2",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -51.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05F9DFA1_08A6_E30F_41A1_11BF8619221D",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -179.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05B6AF21_08A6_E30C_4188_04B5B05E6653",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_832E0E69_8D48_ECFA_41CF_84A47BC32654",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1"
  },
  {
   "yaw": 128.14,
   "backwardYaw": -62.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884",
   "distance": 1
  },
  {
   "yaw": 0.25,
   "backwardYaw": -173.31,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357"
  }
 ],
 "hfov": 360,
 "label": "LDK-04",
 "audios": [
  "this.audio_832E0E69_8D48_ECFA_41CF_84A47BC32654"
 ],
 "id": "panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629",
 "thumbnailUrl": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 2277.4,
   "angle": 268.01,
   "y": 1299.99,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_705D33F1_7FB5_0D88_41D7_F83804EFC4D7",
  "this.overlay_704F42FF_7FB7_0F79_41C6_7B2265B306D1",
  "this.overlay_9E45B603_8D49_5C2E_41DA_1F28A92AAF84",
  "this.overlay_9E3B9991_8D49_F42B_41CC_5569A2027201",
  "this.overlay_9F5A8042_8D48_D429_41D4_3CDD2F8B729E"
 ]
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_0413EE58_08A6_E53D_4181_3FD171B81747",
 "class": "PlayList"
},
{
 "items": [
  "this.PanoramaPlayListItem_0410BE62_08A6_E50D_416D_33A43990682C",
  "this.PanoramaPlayListItem_046BCE66_08A6_E514_4193_8CAA6E3AD4EC",
  "this.PanoramaPlayListItem_046B6E67_08A6_E514_4171_386BAFE1B104",
  "this.PanoramaPlayListItem_046C0E67_08A6_E514_4171_7899CF04CF6C",
  "this.PanoramaPlayListItem_046BBE67_08A6_E514_41A0_786DFF0E0414",
  "this.PanoramaPlayListItem_046ADE68_08A6_E51C_415B_0774DF77A4C8"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 17.38,
  "class": "PanoramaCameraPosition",
  "pitch": -0.74
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 10.61,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 10.61,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 10.61,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_6359352A_6978_38C0_41D5_931ED9E641C1_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_04142E58_08A6_E53D_4190_B2CA27DBA2B7",
 "class": "PlayList"
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_6854CF1F_7D13_53A3_4194_457EB7BB50DC",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "SED_01",
 "id": "map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_t.png",
 "width": 3000,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D.png",
    "width": 3000,
    "class": "ImageResourceLevel",
    "height": 2158
   },
   {
    "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_lq.png",
    "width": 301,
    "class": "ImageResourceLevel",
    "height": 217,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.1,
 "maximumZoomFactor": 1.2,
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.5,
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideColor": "#CCFFCC",
 "height": 2158,
 "overlays": [
  "this.overlay_7DBC6C80_69A9_DF2E_41C5_CBF3518B1B24",
  "this.overlay_7A6BF08E_69A9_A732_41C8_EF7DA7D8B2C7",
  "this.overlay_7A4C1F97_69A8_5952_41D4_B36910421F2A",
  "this.overlay_7DAFA12E_69A8_6973_41BE_E1187995A77B",
  "this.overlay_70BC21A8_7E7E_F74C_41D2_5F8D8F192942",
  "this.overlay_719E089B_7E7D_F54C_41BA_138BD9D69A67"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 61.9,
   "backwardYaw": -34.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
   "distance": 1
  },
  {
   "yaw": -126.94,
   "backwardYaw": 6.49,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "BEDROOM-01",
 "audios": [
  "this.audio_6816863F_7D13_75E3_417D_A980399A8190"
 ],
 "id": "panorama_6361C31F_6978_78C0_41D2_858A65A0F357",
 "thumbnailUrl": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 940.65,
   "angle": 229.53,
   "y": 1252.23,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_7BFBDA10_69A8_5B2E_41BF_3395D76C5BD4",
  "this.overlay_993646D6_8D49_BDD6_41E0_C247A4AEEB9F"
 ]
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_6816863F_7D13_75E3_417D_A980399A8190",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 3.48,
  "class": "PanoramaCameraPosition",
  "pitch": -0.25
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_6361C31F_6978_78C0_41D2_858A65A0F357_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 6.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_04441EC9_08A6_E51F_4194_362DD16638E8",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -162.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05DB6FCE_08A6_E315_4199_33E0EE02C420",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": -173.31,
   "backwardYaw": 0.25,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629",
   "distance": 1
  },
  {
   "yaw": 6.49,
   "backwardYaw": -126.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357",
   "distance": 1
  },
  {
   "yaw": 17.61,
   "backwardYaw": -164.36,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1"
  }
 ],
 "hfov": 360,
 "label": "LDK-02",
 "audios": [
  "this.audio_832A2434_8D48_DC69_419C_F9D008F5C79E"
 ],
 "id": "panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
 "thumbnailUrl": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 1680.31,
   "angle": -87.8,
   "y": 1304.24,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_70DF7FB2_7FBD_758B_41D7_F385BA6FAC67",
  "this.overlay_9CE5494B_8D49_543F_41DD_4FA89F18CCE1",
  "this.overlay_9CDF2742_8D49_FC29_41CD_250CF1F06386",
  "this.overlay_9F60F444_8D49_5C29_41D5_E519D598BFF9"
 ]
},
{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337"
  },
  {
   "yaw": -62.74,
   "backwardYaw": 128.14,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "LDK-03",
 "audios": [
  "this.audio_831232E0_8D48_F5EA_41DF_9DE952918D92"
 ],
 "id": "panorama_7085271D_7E72_5B44_419F_4396BF42E884",
 "thumbnailUrl": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 2370.99,
   "angle": 247.52,
   "y": 1043.7,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_700D5E64_7FBB_168F_41A5_995A66BE68BE",
  "this.overlay_70134276_7FB5_0E8A_41C0_4D6E5CA01503"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 15.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323000
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_0598AF5C_08A6_E336_4167_3524D0345BC5",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "items": [
  {
   "media": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 53.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05886F40_08A6_E30C_4165_5433D827E780",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 117.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_04740EA6_08A6_E515_419C_CAB1DD76EF3D",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_832A2434_8D48_DC69_419C_F9D008F5C79E",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -173.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05A64F04_08A6_E315_419A_D7ED50F63615",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -40.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323000
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_05E98F8B_08A6_E313_4197_E1FA1DB4F7EB",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 145.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323000
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_0454AEE5_08A6_E517_41A0_6DF25E1AEE4F",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_7085271D_7E72_5B44_419F_4396BF42E884_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 9.25,
  "class": "PanoramaCameraPosition",
  "pitch": -0.78
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323000
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_camera",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "adjacentPanoramas": [
  {
   "yaw": -34.57,
   "backwardYaw": 61.9,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357",
   "distance": 1
  },
  {
   "yaw": -164.36,
   "backwardYaw": 17.61,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
   "distance": 1
  },
  {
   "yaw": 139.06,
   "backwardYaw": -22.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "BEDROM-02",
 "audios": [
  "this.audio_70294095_7CF2_AEA7_41B8_87E77BDF8CC2"
 ],
 "id": "panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
 "thumbnailUrl": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "100%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 1035.21,
   "angle": -76.57,
   "y": 987.93,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_7A0EE690_69BB_EB2F_41C1_673F9E3767B4",
  "this.overlay_7A6E7C60_69BB_DFEF_41A3_0AB77CACA052",
  "this.overlay_9EED1696_8D4B_5C29_41D3_53A62CFEBAA4"
 ]
},
{
 "autoplay": true,
 "audio": "this.audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "id": "audio_831232E0_8D48_F5EA_41DF_9DE952918D92",
 "data": {
  "label": "All I Am - Dyalla"
 },
 "class": "PanoramaAudio"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884"
  },
  {
   "yaw": -22.4,
   "backwardYaw": 139.06,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "TOILET",
 "audios": [
  "this.audio_6854CF1F_7D13_53A3_4194_457EB7BB50DC"
 ],
 "id": "panorama_6359352A_6978_38C0_41D5_931ED9E641C1",
 "thumbnailUrl": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_t.jpg",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D",
   "x": 1607.45,
   "angle": -20.65,
   "y": 1007.21,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_7BBE3638_69A9_AB5E_41D2_2465EAEF2C38",
  "this.overlay_7B272A32_69A8_FB53_41C1_B7A9CB7D456B"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 157.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 10.61,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 10.61,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 10.61,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_052B4FE5_08A6_E317_4146_345CA8E95F5D",
 "manualZoomSpeed": 0,
 "manualRotationSpeed": 600,
 "automaticRotationSpeed": 40
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "bold",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.5,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "italic",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "transparent",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, null, null, false) } else { this.setComponentVisibility(this.MapViewer, false, 0, null, null, false) }; if(!this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42.get('visible')){ this.setComponentVisibility(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42, true, 0, null, null, false) } else { this.setComponentVisibility(this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42, false, 0, null, null, false) }",
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0
 ]
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0.48%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "24.896%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "bold",
 "height": "25.249%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0.5,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "italic",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "transparent",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0.78%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "MapViewer"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 100,
 "id": "ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#CCCCCC",
 "itemMode": "normal",
 "right": "19.82%",
 "scrollBarOpacity": 0.26,
 "itemLabelHorizontalAlign": "center",
 "scrollBarVisible": "always",
 "itemPaddingRight": 3,
 "horizontalAlign": "center",
 "width": "47.821%",
 "paddingLeft": 20,
 "itemThumbnailOpacity": 1,
 "minHeight": 20,
 "itemBorderRadius": 0,
 "itemThumbnailShadowOpacity": 0.27,
 "selectedItemThumbnailShadowBlurRadius": 0,
 "itemLabelFontFamily": "Arial",
 "minWidth": 20,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "height": "14.729%",
 "itemOpacity": 1,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemThumbnailShadowSpread": 1,
 "itemBackgroundOpacity": 0,
 "itemThumbnailShadowHorizontalLength": 3,
 "backgroundOpacity": 0.12,
 "itemThumbnailBorderRadius": 5,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": true,
 "shadow": false,
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadowOpacity": 0,
 "layout": "horizontal",
 "borderSize": 0,
 "paddingRight": 20,
 "itemThumbnailShadowVerticalLength": 3,
 "selectedItemBackgroundOpacity": 0,
 "selectedItemLabelFontSize": "13.065px",
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "playList": "this.ThumbnailList_64701FF1_6998_B8D1_41BD_BF277A5CEB42_playlist",
 "selectedItemThumbnailShadowOpacity": 0,
 "itemThumbnailShadowBlurRadius": 8,
 "bottom": "2.1%",
 "itemLabelFontSize": 14,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "middle",
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "gap": 2,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 72,
 "class": "ThumbnailList",
 "paddingTop": 10,
 "itemThumbnailShadow": true,
 "paddingBottom": 10,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelGap": 5,
 "scrollBarWidth": 10,
 "itemThumbnailShadowColor": "#000000"
},
{
 "mp3Url": "media/audio_70294095_7CF2_AEA7_41B8_87E77BDF8CC2.mp3",
 "id": "audioresource_6817663F_7D13_75E3_41AB_0856198944C5",
 "oggUrl": "media/audio_70294095_7CF2_AEA7_41B8_87E77BDF8CC2.ogg",
 "class": "AudioResource"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.05,
   "pitch": -23.61,
   "yaw": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_820243FF_8D48_BBD7_41DE_B05E728A76F2",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337, this.camera_04441EC9_08A6_E51F_4194_362DD16638E8); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_705D33F1_7FB5_0D88_41D7_F83804EFC4D7",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.05,
   "yaw": 0.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.49,
   "pitch": -43.91,
   "yaw": 128.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E2A7F76_8A3A_D204_41DE_0315ADD92766",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7085271D_7E72_5B44_419F_4396BF42E884, this.camera_04740EA6_08A6_E515_419C_CAB1DD76EF3D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_704F42FF_7FB7_0F79_41C6_7B2265B306D1",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.49,
   "yaw": 128.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -43.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.59,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_2_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": -1.43,
   "yaw": 3.05
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9E45B603_8D49_5C2E_41DA_1F28A92AAF84",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.59,
   "yaw": 3.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.91,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_3_0.png",
      "width": 134,
      "class": "ImageResourceLevel",
      "height": 180
     }
    ]
   },
   "pitch": -3.32,
   "yaw": 9.9
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9E3B9991_8D49_F42B_41CC_5569A2027201",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.91,
   "yaw": 9.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.79,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_4_0.png",
      "width": 180,
      "class": "ImageResourceLevel",
      "height": 180
     }
    ]
   },
   "pitch": -10.04,
   "yaw": 13.39
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9F5A8042_8D48_D429_41D4_3CDD2F8B729E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.79,
   "yaw": 13.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "media": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_0410BE62_08A6_E50D_416D_33A43990682C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_camera",
 "id": "PanoramaPlayListItem_0410BE62_08A6_E50D_416D_33A43990682C",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_046BCE66_08A6_E514_4193_8CAA6E3AD4EC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_7085271D_7E72_5B44_419F_4396BF42E884_camera",
 "id": "PanoramaPlayListItem_046BCE66_08A6_E514_4193_8CAA6E3AD4EC",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_046B6E67_08A6_E514_4171_386BAFE1B104, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_camera",
 "id": "PanoramaPlayListItem_046B6E67_08A6_E514_4171_386BAFE1B104",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_046C0E67_08A6_E514_4171_7899CF04CF6C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357_camera",
 "id": "PanoramaPlayListItem_046C0E67_08A6_E514_4171_7899CF04CF6C",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_046BBE67_08A6_E514_41A0_786DFF0E0414, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_camera",
 "id": "PanoramaPlayListItem_046BBE67_08A6_E514_41A0_786DFF0E0414",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1",
 "end": "this.trigger('tourEnded')",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_046ADE68_08A6_E51C_415B_0774DF77A4C8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1_camera",
 "id": "PanoramaPlayListItem_046ADE68_08A6_E51C_415B_0774DF77A4C8",
 "class": "PanoramaPlayListItem"
},
{
 "map": {
  "width": 200,
  "x": 1507.56,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_8_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 907.41
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "toolTip": "Bath"
  }
 ],
 "image": {
  "x": 1507.45,
  "class": "HotspotMapOverlayImage",
  "y": 907.21,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_8.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_7DBC6C80_69A9_DF2E_41C5_CBF3518B1B24",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 200,
  "x": 2177.4,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_9_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1199.99
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 2177.4,
  "class": "HotspotMapOverlayImage",
  "y": 1199.99,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_9.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_7A6BF08E_69A9_A732_41C8_EF7DA7D8B2C7",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 200,
  "x": 840.71,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1152.27
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 840.65,
  "class": "HotspotMapOverlayImage",
  "y": 1152.23,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_10.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_7A4C1F97_69A8_5952_41D4_B36910421F2A",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 200,
  "x": 935.28,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_11_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 888.14
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 935.21,
  "class": "HotspotMapOverlayImage",
  "y": 887.93,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_11.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_7DAFA12E_69A8_6973_41BE_E1187995A77B",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 200,
  "x": 1580.31,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_12_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1204.24
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 1580.31,
  "class": "HotspotMapOverlayImage",
  "y": 1204.24,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_12.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_70BC21A8_7E7E_F74C_41D2_5F8D8F192942",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 200,
  "x": 2270.99,
  "height": 200,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_13_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 943.7
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "image": {
  "x": 2270.99,
  "class": "HotspotMapOverlayImage",
  "y": 943.7,
  "width": 200,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_62ECE4A3_6998_AF72_41D4_3C8D38BCC67D_HS_13.png",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 200
    }
   ]
  },
  "height": 200
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_719E089B_7E7D_F54C_41BA_138BD9D69A67",
 "data": {
  "label": "Image"
 },
 "class": "AreaHotspotMapOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.32,
   "pitch": -10.24,
   "yaw": 61.9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68A76299_7D12_B2AF_41CA_81F1600D8AD2",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3, this.camera_0454AEE5_08A6_E517_41A0_6DF25E1AEE4F); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7BFBDA10_69A8_5B2E_41BF_3395D76C5BD4",
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.32,
   "yaw": 61.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.79,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0_HS_2_0.png",
      "width": 199,
      "class": "ImageResourceLevel",
      "height": 199
     }
    ]
   },
   "pitch": 0.2,
   "yaw": -126.94
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337, this.camera_05A64F04_08A6_E315_419A_D7ED50F63615); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_993646D6_8D49_BDD6_41E0_C247A4AEEB9F",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.79,
   "yaw": -126.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.48,
   "pitch": -31.05,
   "yaw": -173.31,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E271F73_8A3A_D21C_41C6_CFFE4098FE5E",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629, this.camera_05B6AF21_08A6_E30C_4188_04B5B05E6653); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_70DF7FB2_7FBD_758B_41D7_F385BA6FAC67",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.48,
   "yaw": -173.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.03,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_1_0.png",
      "width": 160,
      "class": "ImageResourceLevel",
      "height": 160
     }
    ]
   },
   "pitch": -0.91,
   "yaw": 6.49
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357, this.camera_05886F40_08A6_E30C_4165_5433D827E780); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9CE5494B_8D49_543F_41DD_4FA89F18CCE1",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.03,
   "yaw": 6.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.77,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_2_0.png",
      "width": 199,
      "class": "ImageResourceLevel",
      "height": 199
     }
    ]
   },
   "pitch": -3.28,
   "yaw": 43.13
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9CDF2742_8D49_FC29_41CD_250CF1F06386",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.77,
   "yaw": 43.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.91,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_3_0.png",
      "width": 180,
      "class": "ImageResourceLevel",
      "height": 180
     }
    ]
   },
   "pitch": -1.6,
   "yaw": 17.61
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3, this.camera_0598AF5C_08A6_E336_4167_3524D0345BC5); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9F60F444_8D49_5C29_41D5_E519D598BFF9",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.91,
   "yaw": 17.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.28,
   "pitch": -19.61,
   "yaw": -11.83,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8202E3FE_8D48_BBD9_41B5_F4CAF819886E",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_700D5E64_7FBB_168F_41A5_995A66BE68BE",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.28,
   "yaw": -11.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.59,
   "pitch": -36.58,
   "yaw": -62.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_820223FF_8D48_BBD7_41D4_93488561D581",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629, this.camera_05F9DFA1_08A6_E30F_41A1_11BF8619221D); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_70134276_7FB5_0E8A_41C0_4D6E5CA01503",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.59,
   "yaw": -62.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -36.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.36,
   "pitch": -6.71,
   "yaw": -34.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68A43299_7D12_B2AF_41D0_AAA5FE9546D7",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6361C31F_6978_78C0_41D2_858A65A0F357, this.camera_05CA1FB7_08A6_E373_4177_0CC1001FA7F0); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A0EE690_69BB_EB2F_41C1_673F9E3767B4",
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.36,
   "yaw": -34.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.34,
   "pitch": -9.15,
   "yaw": 139.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68A4929A_7D12_B2AD_41D2_B3918646976F",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6359352A_6978_38C0_41D5_931ED9E641C1, this.camera_052B4FE5_08A6_E317_4146_345CA8E95F5D); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A6E7C60_69BB_DFEF_41A3_0AB77CACA052",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.34,
   "yaw": 139.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.45,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_3_0.png",
      "width": 169,
      "class": "ImageResourceLevel",
      "height": 169
     }
    ]
   },
   "pitch": 0.62,
   "yaw": -164.36
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337, this.camera_05DB6FCE_08A6_E315_4199_33E0EE02C420); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_9EED1696_8D4B_5C29_41D3_53A62CFEBAA4",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.45,
   "yaw": -164.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.38,
   "pitch": -5.06,
   "yaw": -22.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68A4D29A_7D12_B2AD_41DA_A3216B407D75",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3, this.camera_05E98F8B_08A6_E313_4197_E1FA1DB4F7EB); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "BED 1"
  }
 ],
 "id": "overlay_7BBE3638_69A9_AB5E_41D2_2465EAEF2C38",
 "data": {
  "label": "Arrow 01 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.38,
   "yaw": -22.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.39,
   "pitch": -1.11,
   "yaw": 47.91,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_68A5029A_7D12_B2AD_41DD_BD3DE5AFC3C5",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "LDK"
  }
 ],
 "id": "overlay_7B272A32_69A8_FB53_41C1_B7A9CB7D456B",
 "data": {
  "label": "Arrow 01 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.39,
   "yaw": 47.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_820243FF_8D48_BBD7_41DE_B05E728A76F2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9E2A7F76_8A3A_D204_41DE_0315ADD92766",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_709D070A_7E72_7B4C_41D8_DA4A141C9629_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_68A76299_7D12_B2AF_41CA_81F1600D8AD2",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6361C31F_6978_78C0_41D2_858A65A0F357_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9E271F73_8A3A_D21C_41C6_CFFE4098FE5E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_71DE0600_7E73_BD3C_41D2_EA370C92B337_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_8202E3FE_8D48_BBD9_41B5_F4CAF819886E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_820223FF_8D48_BBD7_41D4_93488561D581",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_7085271D_7E72_5B44_419F_4396BF42E884_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_68A43299_7D12_B2AF_41D0_AAA5FE9546D7",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_68A4929A_7D12_B2AD_41D2_B3918646976F",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_632F5C23_6978_C8C0_41CC_BF1BA1A21BA3_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_68A4D29A_7D12_B2AD_41DA_A3216B407D75",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_68A5029A_7D12_B2AD_41DD_BD3DE5AFC3C5",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6359352A_6978_38C0_41D5_931ED9E641C1_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
