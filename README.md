# 2. kodutöö – ToDo rakendus
Priit Laupa, Caupo helvik, Kristjan Põldmets - Remonditöökoja ToDo rakendus


Ette tulnud keerukusteks olid JSON array elementide sorteerimine, PHP - AJAX vaheline suhtlus ning JSON stringi püüdmine PHP's.
Grupitööd viisime läbi SourceTree abil, eemaldades vajaduse greenysse logimiseks ja Putty teel Lin2 ühenduse loomiseks.
Rakenduses on võimalik lisada ja kustutada kirjeid, märkida ülesanded tehtuks, järjestada kuupäeva, nime ja numbrimärgi järgi kirjeid, lisada kategooriaid, märkida ülesandeid tehtuks. Möödunud ja sama kuupäevaga kirjed kuvavad vastavalt teavitust.
Rakendus baseerub Caupo Helvik'u loodud põhjal.
Priit Laupa poolt lisatud funktsionaalsused:
Uuendamise, töö tehtuks märkimise ja töö kustutamise nuppudele lisatud animatsioonid.
Tabeli pealkirjade peale vajutades on võimalik sorteerida tabelit vastavalt tabeli veeru sisule.
Vastavalt kuupäevale on tabelis teavitus, kas töö tähtaeg on, vastavalt lehe kasutamise kuupäevale, "TÄNA!" või "MÖÖDUNUD!". Töö tehtuks märkimisel on selle teavituse asemel teavitus "TEHTUD!"

### Tähtpäev 21.04.2019 23:59

## Nõuded

1. Töö tuleb teha vähemalt kahekesi, eelnevalt kokkuleppel on lubatud ka kolm liiget. GitHub'is peab eristuma, kes mida tegi!
1. README.md fail sisaldab:
    * autorite nimesid;
    * kirjeldust tekkinud keerukustest
    * funktsionaalsuste kirjeldust
1. Todo rakenduse funktsionaalsused:   
    * Saab lisad ja kustutada
    * Saab märkida ülesandeid tehtuks
    * Saab järjestada kuupäeva ja nime järgi ülesandeid
    * Ülesanded salvestatakse localStorage'isse ja faili/andmebaasi
    * Ülesannete salvestamiseks ja kuvamiseks kasutatakse AJAX-it
    * Kui kasutaja tuleb lehele, siis näidatakse varem salvestatud ülesandeid
    * Lisa ise 2 funktsionaalsust juurde. Võib ise mõelda või valida antud listist:
         * Võimalus lisada kategooriad ja nende alusel jagada ülesandeid
         * Möödunud ja/või tänase kuupäevaga tegemata ülesanded märkida erinevalt
         * Võimalus otsida ülesandeid
         * Võimalus märkida ülesandeid tähtsaks ning kuvada tähtsad ülesanded eraldi listina
1. Väljanägemine ja animatsioonid
    * Rakendus näeb kena välja
    * Elementide kuvamisel/eemaldamisel on kasutatud jQuery animatsioone


## Githubi töövoog grupiga töötades

1. Üks grupi liikmetest teeb fork-i 2kodutoo repositooriumist
2. Tuleb lisada meeskonnaliikmed collaborators-iteks fork-itud repositooriumi
3. Collaborator-id peavad kutsega nõustuma (e-mail)
4. Iga ühel tuleb teha git clone fork-itud repositooriumist (git clone https://YOURUSERNAME@github.com/REPOSITORYOWNERUSERNAME/REPOSITORY.git)
5. Muudatuste lisamine:
     * git add
     * git commit
     * git fetch & pull
     * git push

## Kasulikud viited
* [JQuery dokumentatsioon](http://api.jquery.com)
* [Collaboration on github](https://github.com/eesrakenduste-arendamine-2019/2kodutoo/settings/collaboration)
* [JQuery POST](https://api.jquery.com/jquery.post/)
* [JQuery AJAX](http://api.jquery.com/jquery.ajax/)
