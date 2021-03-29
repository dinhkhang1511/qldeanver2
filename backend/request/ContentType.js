module.exports = (extname) => {
    let contentType = "text/html";    
    switch (extname) {
        case ".js":     contentType = "text/javascript";    break;
        case ".css":    contentType = "text/css";           break;
        case ".json":   contentType = "application/json";   break;
        case ".png":    contentType = "image/png";          break;
        case ".jpg":    contentType = "image/jpg";          break;
        case ".jpeg":   contentType = "image/jpeg";         break;
        case ".mp4":    contentType = "video/mp4";          break;
        case ".m3u8":    contentType = "application/x-mpegURL";      break;
        case ".ts":    contentType = "video/mp2t";      break;
        case ".torrent": contentType = "application/force-download"; break;
    }
    return contentType;
}
