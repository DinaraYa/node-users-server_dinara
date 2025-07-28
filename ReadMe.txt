
Для начала я создала
private ws = fs.createWriteStream('data_new1.txt');
что бы проверить, что файл создается. => Создается

После я использовала
fs.writeFileSync('data_new.txt', data);

файл 'data_new.txt' снова создался, потому что writeFileSync метод синхронный, он останавливает код
и ждет пока запись в файл закончится, а после продолжает код.


В итоге, ws.write асинхронный, а сервер падает бысто и ws.write не успевает записывать потому что
функция saveDataToFile() не была асинхроннна. В итоге я обернула saveDataToFile() в файле UserServiceEmbeddedImpl,
 а в файле Server добавила async - await.