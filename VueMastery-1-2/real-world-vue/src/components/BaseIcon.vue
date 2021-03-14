<template>
    <!-- mit dem computed "svg" klappt der <slot> nicht.. liegt wohl eher am "v-html="svg"
    <div class="icon-wrapper" v-html="svg"> -->
    <div class="icon-wrapper">
        <!-- daher hier hart codiertes rendering (was svg() zurückgibt
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users icon">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg> -->
        <!-- 3. Lösung (Vuex-Kurs): feather-Icon aus dem Filesystem nehmen -->
        <svg class="icon" :width="width" :height="height">
            <use v-bind="{'xlink:href':'/feather-sprite.svg#' + name}"/>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
    import feather from 'feather-icons'
    export default {
        name: 'Icon',
        props: {
            name: String,
            width: {
                type: [Number, String],
                default: 24
            },
            height: {
                type: [Number, String],
                default: 24
            }
        },
        computed: {
            // wird nicht verwendet, da <slot> sonst nicht funktioniert (siehe oben)
            svg() {
                // This way, our BaseIcon is designed to be able to draw any symbol we want it to from the feather-icons library. 
                // When we place our BaseIcon component within the template of a parent component, we can feed it a name via props, which BaseIcon will render the symbol that matches the name.
                // If we wanted to alter its size from the default 24px, we could pass them into BaseIcon like so:
                // <BaseIcon name="activity" width="48" height="48" />
                console.log(
                    feather.icons[this.name].toSvg({ 
                    class: "icon",
                    width: this.width,
                    height: this.height
                })
                );
                return feather.icons[this.name].toSvg({ 
                    class: "icon",
                    width: this.width,
                    height: this.height
                })
            }
        }
    }
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>