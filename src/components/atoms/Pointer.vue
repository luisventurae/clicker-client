<template>
    <div class="float" :style="`left: ${x}px; top: ${y}px;`">
        <div class="float-content">
            <svg :fill="fill" :width="size" :heigth="size" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512.004 512.004" style="enable-background:new 0 0 512.004 512.004;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M434.2,344.473L92.866,3.14c-3.029-3.051-7.616-3.989-11.605-2.325c-3.989,1.643-6.592,5.547-6.592,9.856v490.667 c0,4.395,2.688,8.32,6.763,9.92c1.259,0.512,2.581,0.747,3.904,0.747c2.901,0,5.76-1.195,7.808-3.413l135.509-145.92h198.016 c4.309,0,8.213-2.603,9.856-6.592C438.168,352.111,437.272,347.524,434.2,344.473z"/>
                    </g>
                </g>
            </svg>        
            <span class="caption">{{ username }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pointer',
    props: {
        username: {
            type: String,
            required: true,
        },
        fill: {
            type: String,
            default: '#00000',
        },
        x: {
            type: Number,
            default: 0,
        },
        y: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 16,
        },
    },
}
</script>

<style >
    .float {
        width: min-content;    
        height: min-content;    
        position: absolute;
    }
    .float-content {   
        position: relative;
    }
    .caption {
        position: absolute;
        top: 12px;
        left: 5px;
        cursor: default;
    }
</style>