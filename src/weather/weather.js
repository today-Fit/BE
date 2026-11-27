// 1. 발급받은 API 키 입력
const apiKey = "99b0a30e4be95cba20187611b7a3fded";

// 2. 날씨를 확인할 도시 이름 설정 (예: 서울)
const city = "Seoul";

// 3. API 요청 주소 (섭씨온도: units=metric, 한국어: lang=kr)
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

// 4. fetch 함수로 API 호출하기
fetch(url)
  .then((response) => {
    // 응답이 정상인지 확인
    if (!response.ok) {
      throw new Error("네트워크 응답이 정상이 아닙니다.");
    }
    // JSON 형태로 데이터 변환
    return response.json();
  })
  .then((data) => {
    // 5. 받아온 데이터 출력하기
    console.log(`🌍 지역: ${data.name}`);
    console.log(`🌡️ 현재 온도: ${data.main.temp}°C`);
    console.log(`💧 습도: ${data.main.humidity}%`);
    console.log(`☁️ 날씨: ${data.weather[0].description}`);
  })
  .catch((error) => {
    console.error("API 호출 중 에러 발생:", error);
  });
