const { createApp } = Vue;

createApp({
    data() {
        return {
            character: [],
            loading: true,
            searchText: '',
            nextPage: 1,
            showJutsus: false,
        }
    },
    computed: {
        filtredCharacter(){
            return this.character.filter(character => character.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    },
    created() {
        this.fetchCharacters();
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        async fetchCharacters() {
            try {
                const response = await fetch(`https://narutodb.xyz/api/character?page=${this.nextPage}&limit=20`)
                console.log(response)
                const data = await response.json();
                console.log(data)
                const characterDetails = data.characters.map(character => this.processCharacterData(character))
                this.character = [... this.character, ... characterDetails];
                this.nextPage++;
                this.loading = false;
            } catch (error) {
                console.error('Error fetching Naruto characters data:', error)
            }
        },

        processCharacterData(character){
            return {
                id: character.id,
                name: character.name,
                images: character.images,
                debut: character.debut,
                personal: character.personal,
                affiliation: this.formatType(character.personal.affiliation),
                birthdate: character.personal.birthdate,
                family: character.family,
                jutsu: character.jutsu,
                natureType: character.natureType,
                uniqueTraits: character.uniqueTraits,
                showDetails: true,
            }
        },

        formatType(type) {
            if (Array.isArray(type)) {
                type = type[0];
            }
            return typeof type === 'string' ? type.replace(/\s+/g, '_') : '';
        },                         

        getTypeClass(type) {
            const typeClassMap = {
                Amegakure: "Amegakure",
                Bamboo_Village: "Bamboo_Village",
                Ceramic_Village: "Ceramic_Village",
                Curtain_Village: 'Curtain_Village',
                Daidai_Village: 'Daidai_Village',
                Genjutsu_Tree_Village: 'Genjutsu_Tree_Village',
                Hachō_Village: "Hachō_Village",
                Hoshigakure: "Hoshigakure",
                Howling_Wolf_Village: "Howling_Wolf_Village",
                Inaho_Village: "Inaho_Village",
                Ishigakure: "Ishigakure",
                Iwagakure: "Iwagakure",
                Land_of_Waves: "Land_of_Waves",
                Jōmae_Village: "Jōmae_Village",
                Kagerō_Village: "Kagerō_Village",
                Kirigakure: "Kirigakure",
                Kisaragi_Village: "Kisaragi_Village",
                Konohagakure: "Konohagakure",
                Kumogakure: "Kumogakure",
                Kusagakure: "Kusagakure",
                Mount_Katsuragi: "Mount_Katsuragi",
                Mount_Myōboku: "Mount_Myōboku",
                Nadeshiko_Village: "Nadeshiko_Village",
                Otogakure: "Otogakure",
                Ryūchi_Cave: "Ryūchi_Cave",
                Shangri_la: "Shangri_la",
                Shikkotsu_Forest: "Shikkotsu_Forest",
                Shimogakure: "Shimogakure",
                Sugi_Village: "Sugi_Village",
                Sunagakure: "Sunagakure",
                Takigakure: "Takigakure",
                Takumi_Village: "Takumi_Village",
                Tanigakure: "Tanigakure",
                Tonika_Village: "Tonika_Village",
                Tsuchigumo_Village: "Tsuchigumo_Village",
                Tsukigakure: "Tsukigakure",
                Uzushiogakure: "Uzushiogakure",
                Yugakure: "Yugakure",
                Yukigakure: "Yukigakure",
                Yumegakure: "Yumegakure"
            }

            return typeClassMap[type] || ''
        },
        handleScroll() {
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 500
        
            if (bottomOfWindow && !this.loading) {
                this.loading = true;
                this.fetchCharacters();
            }
        }
        
    }

}).mount("#app");