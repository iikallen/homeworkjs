        // Функция для выполнения поиска видео
        function searchVideos() {
            var searchQuery = document.getElementById('searchInput').value;
            var apiKey = 'YOUR_API_KEY'; // Замените 'YOUR_API_KEY' на ваш API ключ
            var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + searchQuery + '&key=' + apiKey;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.items);
            })
            .catch(error => console.error('Ошибка при выполнении запроса:', error));
        }

        // Функция для отображения результатов поиска
        function displaySearchResults(videos) {
            var resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '';

            videos.forEach(video => {
                var thumbnailUrl = video.snippet.thumbnails.default.url;
                var videoId = video.id.videoId;

                var thumbnail = document.createElement('img');
                thumbnail.src = thumbnailUrl;
                thumbnail.style.cursor = 'pointer';
                thumbnail.onclick = function() {
                    displayVideo(videoId);
                    displayLikes(videoId);
                    displayDislikes(videoId);
                    displayComments(videoId);
                };

                resultsDiv.appendChild(thumbnail);
            });
        }

        // Функция для отображения выбранного видео
        function displayVideo(videoId) {
            var videoPlayerDiv = document.getElementById('videoPlayer');
            videoPlayerDiv.innerHTML = '';

            var iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = 'https://www.youtube.com/embed/' + videoId;
            iframe.allowFullscreen = true;

            videoPlayerDiv.appendChild(iframe);
        }

        // Функция для отображения количества лайков
        function displayLikes(videoId) {
            var apiKey = 'YOUR_API_KEY'; // Замените 'YOUR_API_KEY' на ваш API ключ
            var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videoId + '&key=' + apiKey;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('likes').innerText = 'Лайки: ' + data.items[0].statistics.likeCount;
            })
            .catch(error => console.error('Ошибка при выполнении запроса:', error));
        }

        // Функция для отображения количества дизлайков
        function displayDislikes(videoId) {
            var apiKey = 'YOUR_API_KEY'; // Замените 'YOUR_API_KEY' на ваш API ключ
            var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videoId + '&key=' + apiKey;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('dislikes').innerText = 'Дизлайки: ' + data.items[0].statistics.dislikeCount;
            })
            .catch(error => console.error('Ошибка при выполнении запроса:', error));
        }

        // Функция для отображения комментариев
        function displayComments(videoId) {
            var apiKey = 'YOUR_API_KEY'; // Замените 'YOUR_API_KEY' на ваш API ключ
            var url = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=' + videoId + '&key=' + apiKey;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                var commentsDiv = document.getElementById('comments');
                commentsDiv.innerHTML = '';

                data.items.forEach(item => {
                    var commentText = item.snippet.topLevelComment.snippet.textDisplay;
                    var commentElement = document.createElement('p');
                    commentElement.innerText = commentText;
                    commentsDiv.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Ошибка при выполнении запроса:', error));
        }