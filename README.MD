# LABBY
## Andasis Bilgisayar Ağları Laboratuvarı Sistemi




LABBY, bilgisayar ağları laboratuvarı giriş/çıkış işlemlerinin yapıldığı bir yazılım projesidir.

- Asistanın labı açıp kapaması.
- Öğrencinin laba giriş çıkış yapması.
- Adminin asistan eklemesi

## Özellikler

- Kullanıcı validasyonu.
- Rol sistemi ve yetkilendirme.
- Tamamen asenkron çalışma yapısı.
- SOLID prensiplerine uygun geliştirme.
- Repository deseninin uygulanması.
- Code First Database tasarımı.
- Json Web Token kullanımıyla kapsamlı kullanıcı ve token yönetimi.


## Teknoloji Şeması

![image](https://user-images.githubusercontent.com/76124520/210135629-4a6132f3-0031-44e4-b9a9-dcd476096ec3.png)


## Kullanım
Başlamak için öncelikle sisteme üye olmak gerekiyor. Üye olunduktan sonra kullanıcımız sisteme giriş yapıyor.

Şifresini unutan kullanıcı 'Şifremi unuttum'a tıklayabilir. Tıkladıktan sonra e-mail adresini girmelidir. Girmiş olduğu e-mail adresine gelen kodu belirli süreler içinde sisteme girmelidir. Gelen kodu zamanında ve doğru giren kullanıcı şifresini dseğiştirebilir.
 
Kullanıcının laba girmesi için öncelikle asistanın labı açması gerekiyor.

Asistanlar sadece admin tarafından eklenebilir.

Asistan labı açtığı sırada o günün asistan bilgileri ve labın açılış saati sistem tarafından otomatik olarak listeleniyor. Asistan labda bulunan kullanıcıların listesini görüntüleyebilir.

Lab açıldıktan sonra öğrenciler sisteme giriş yapabilirler. Kullanıcı sisteme giriş yapıldığı sırada giriş saati sisteme ekleniyor. Çıkış yapmak isteyen kullanıcı sistemden çıkarak labdan çıkış saati alınıyor ve sisteme ekleniyor. 

Lab sorumlusu asistant, labı başka bir asistana devredebilir.

Asistant labı kapattığı sırada labda bulunan tüm kullanıcılar sistem tarafından labdan çıkarılır. Kullanıcıların çıkış saatleri ve labın kapanış saati eklenir.
