# Friends

Arkadaşlarınla birlikte bir diziyi birlikte bitirmeye karar verdiniz ve `Friends`'i seçtiniz. Grubun son katılımcılarını netleştirmek için küçük bir uygulama yaptın. Davetsiz misafirleri engellemek için de üye girişi eklemeye karar verdin.
Uygulama videodaki gibi çalışmalı: [Video](https://player.vimeo.com/video/907738862)

Kalan işler şu şekilde:

### ADIM 1: Routing ekle.

- `main.jsx` dosyasında uygulamayı `BrowserRouter` ile sarmala.
- `App.jsx`de routeları ekle.
  - `/friends` FriendsList componentini render etsin. (göstersin)
  - `/login` LoginForm componentini render etsin.
  - `/friends/add` AddForm componentini render etsin.
  - `/` FriendsList componentini render etsin.

### ADIM 2: LoginForm componentini oluştur.

- AddFriend.jsx'den bakabilirsin. [Tasarım](https://i.ibb.co/RTJty0w/login-mockup.png)
  - `username` inputunda placeholder `Username` olsun.
  - `password` inputunda placeholder `Password` olsun.
  - `submit` butonunda metin olarak `SUBMIT` yazsın.
- Form submit edildiğinde `https://nextgen-project.onrender.com/api/s11d2/login`e form datasını POST etsin.
- Test için username: `workintech` ve password: `wecandoit`i kullan.

### ADIM 3: AuthContext oluştur.

- `contexts` klasörü yaratıp içinde `AuthContextProvider.jsx` dosyası oluştur.
  - `AuthContext` adıyla bir context create et ve export et.
  - `AuthContext.Provider` return eden `AuthContextProvider` isimli component fonksiyonunu oluştur.
  - İçinde `Auth` işlemleri için gerekli fonksiyonları ve state değişkenlerini tanımla. (login post, isLoggedIn, authUserInfo v.b.)
  - `AuthContext.Provider`a bunları value olarak vermeyi unutma.
- `App.jsx`'de uygulamayı bu provider ile sarmala.

### ADIM 4: LocalStorage kullan.

- `hooks` klasörü içinde tanımlı `useLocalStorage` hookunu kullanarak gerekli bilgileri `code2work_s11d2` anahtarı ile localstorage'da sakla ve gerekli durumlarda al.

### ADIM 5: Header düzenlemeleri yap.

- `Header.jsx`de kullanıcı giriş yapmadıysa sadece LOGIN butonunu göster. Giriş yaptıysa ise FRIENDS LIST, ADD FRIEND, LOGOUT butonu göster.
- Butonlara tıklandığında ilgili routelar açmasını sağla.
  - `react-router-dom` paketindeki `Link` componenti ile değil, onClick ve history.push ile yapman bekleniyor.

### ADIM 6: FriendsList componentinde listeyi göster.

- [Tasarım](https://i.ibb.co/jv3GQMj/friends-List-mockup.png)
- `https://nextgen-project.onrender.com/api/s11d2/friends` adresine GET isteği at.
- Requestin headerında `authorization` anahtarının değeri olarak `token` bilgisini gönder
- Gelen datayı ekranda göster.

### ADIM 7: Yeni kişi ekleme requestine token ekle.

- `AddFriend.jsx`de yeni arkadaş için atılan isteğin headerında, loginden gelen `token`ı gönder.

### ADIM 8: PrivateRoute.jsx ekle ve kullan.

- `component` klasörü içinde `PrivateRoute.jsx` isminde Protected route componenti oluştur.
- Giriş yapılmadıysa hep `/login` sayfasına yönlendirme yap.

```sh
ÖNEMLİ NOT:
Her adımdan sonra testlerde ilerleme olmayabilir.
Uygulamayı çalışır hale getirmeye odaklanırsanız
günün sonunda tüm testler geçecektir.
```

## 🚀 Projeye Başlama

### Adım 1: Projeyi Kendi Hesabınıza Kopyalayın

1. Bu sayfanın sağ üst köşesindeki **Fork** butonuna tıklayın
2. Kendi GitHub hesabınızda proje kopyası oluşacak

### Adım 2: Projeyi Bilgisayarınıza İndirin

Görseldeki adımları takip edin ya da terminali kullanabilirsiniz.

```bash
git clone [buraya-kendi-fork-linkinizi-yazın]
cd [proje-klasor-adi]
```

### Adım 3: Gerekli Kurulumları Yapın

Terminal açın ve sırasıyla şu komutları çalıştırın:

```bash
npm install
npm run c2w
```

> **💡 İpucu:** Bu komutlar gerekli paketleri yükler ve test sistemini başlatır.

### Adım 4: Projeyi Çalıştırın ve Browserda Görüntüleyin

Yeni bir terminal tabı açın ve şu komutu çalıştırın:

```bash
npm run dev
```

Bu komut projeyi çalıştıracak ve bir link verecek. Bu linki browserda açın ve yazdıklarınızın çıktısını gözlemleyin.

## 📝 Geliştirme Süreci

### 0. Öğrenci numaranızı `student_id.txt` dosyasına yazın 

### 1. Testleri Takip Edin

- Testlerin çalıştığı trminali açık tutun ve test çıktılarını izleyin
- Başarılı testler ✅, başarısız testler ❌ ile gösterilir

### 2. Adım Adım İlerleyin

- Her küçük ilerleme sonrası değişiklikleri kaydedin
- Testlerin durumunu kontrol edin
- Bir özelliği tamamen bitirdikten sonra commit yapın

### 3. Düzenli Commit Yapın

GitHub Desktop uygulamasını kullanarak ilerlemenizi sıklıkla GitHub'a gönderin.
Ya da terminali kullanabilirsiniz:

```bash
git add .
git commit -m "Anlamlı bir commit mesajı"
git push origin main
```

## 🧪 Otomatik Değerlendirme Sistemi

Bu proje otomatik test sistemi ile gelir. Test sonuçları terminal penceresinde görünür. Kırmızı (❌) testleri yeşile (✅) çevirmeye odaklanın.

## 🆘 Sorun Giderme

### Yaygın Sorunlar:

- **npm komutları çalışmıyor:** Node.js kurulu olduğundan emin olun
- **Testler çalışmıyor:** Terminal penceresini kapatıp `npm run c2w` komutunu tekrar çalıştırın

### Yardım İçin:

1. Terminal hatasını tam olarak okuyun
2. Dosya yollarının doğru olduğunu kontrol edin
3. Değişiklikleri kaydettiğinizden emin olun

## 📋 Çalışma Akışı Özeti

1. ✅ Projeyi fork edin ve clone edin
2. ✅ `npm install` ve `npm run c2w` çalıştırın
3. ✅ `npm run dev` ile projeyi çalıştırın ve size verdiği linki açarak yaptıklarınızı takip edin
4. ✅ Terminal'den test sonuçlarını takip edin
5. ✅ Düzenli olarak commit yapın
6. ✅ İlerleyişinizi GitHub'a push edin

**İyi çalışmalar! 🎨✨**
