# 2. kodutöö – ToDo rakendus

### Tähtpäev 21.04.2019 23:59

## Nõuded

1. Töö tuleb teha vähemalt kahekesi, eelnevalt kokkuleppel on lubatud ka kolm liiget. GitHub'is peab eristuma, kes mida tegi!
1. README.md fail sisaldab:
    * autorite nimesid;
    * kirjeldust tekkinud keerukustest
    * funktsionaalsuste kirjeldust
1. Todo rakenduse funktsionaalsused:
    * Saab lisada ja kustutada
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

AUTORID:
Kevin Pruus
Oleksii Inno
Martin Tšerdantsev

KIRJELDUS:

Ilus praktilise kujundusega funktsionaalne tegumihaldur.

PROBLEEMI KIRJELDUS:
NB! Antud töö valmimiskäigul juhendas meid Kevini tuttav. Juhendajaga tegime läbi harjutusülesandeid, mis sarnanesid antud ülesandele.
Ehitasime antud Todo listi nullist üles tänu juhendaja viidetele nõuannetele ja parandustele.
Probleemiks kujunesid 5. tunni materjalidest võetud algfailid, mis olid lõppude lõpuks kõigi poolt tundmatuseni ära modifitseeritud. Antud asjaolu
tekitas olukorra, kus meil kõigil oli koodi üpris raske mõista ning vigade põhjust välja selgitada. Seega otsustasime ehitada Todo listi üles täiesti nullist.
Lõime programmi rakenduse, mis toimib ja on esteetiliselt ilus, kuid paraku esineb seal veel vigu.

Kevin Pruus: võttis ühendust juhendajaga ning tegeles töö vundamendiga.
Oleksii Inno ja Kevin Pruus tegeleid kujundusega.
Martin Tšerdantsev: tegeles jQuery funktsionaalsusega, veaparanduse ja testimisega.

FUNKTSIONAALSUSED:
   * Saab kirjeid lisada ja kustutada.
   * Kirjed salvestatakse localStorage'sse ja tekstifaili.
   * Rakendus töötab AJAX'i abil.
   * Kirjed, mille kuupäev on väiksem/võrdne tänasega märgitakse oranži värviga.
   * Ülesandeid saab märkida tehtuks.
   * Kirjeid saab otsida.
