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

NB! ME EI TEINUD SEDA ÜKSI, MEIL OLI JUHENDAJA ABI! Probleem oli ausalt öeldes, kõigega. Aga aja jooksul saime probleemidest üle.
Kõige veidram ja raskem asi ole meie jaoks kujundus ja põhifunktsionaalsus. Ka praegugi ei ole see vigadeta.

Kevin Pruus: võttis ühendust juhendajaga ning tegeles töö vundamendiga.
Oleksii Inno: tegeles kujundusega.
Martin Tšerdantsev: tegeles jQuery funktsionaalsusega, veaparanduse ja testimisega.

FUNKTSIONAALSUSED:
   * Saab kirjeid lisada ja kustutada.
   * Kirjed salvestatakse localStorage'sse ja tekstifaili.
   * Rakendus töötab AJAX'i abil.
   * Kirjed, mille kuupäev on väiksem/võrdne tänasega märgitakse oranži värviga.
   * Ülesandeid saab märkida tehtuks.
   * Kirjeid saab otsida.
