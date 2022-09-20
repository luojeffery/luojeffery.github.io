var particles = [];
var maxLife;
var canvas;
var options = {  
  Background : '#0a0a0a',
  Color1 : "#808080",
  Color2 : '#0799f2',
  Color3 : '#45217c',
  Length : 2,
  Nums : 2000,
  Size : 2,
  noiseScale: 1078,
  ColorMode : 'Splice'
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    for(var i = 0; i < options.Nums; i++){
        particles[i].respawn();
    }
}

function setup() {
    backgroundColor = color(options.Background);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", -1);
    background(backgroundColor);
    for(var i = 0; i < options.Nums; i++){
        particles[i] = new Particle();
    }
}

function draw(){
    noStroke();
    smooth();  
    maxLife = options.Length;
    for(var i = 1; i < options.Nums; i++) {
        var iterations = map(i,0,options.Nums,5,1);
        var radius = options.Size;
        
        particles[i].move(iterations);
        particles[i].checkEdge();
        
        var alpha = 1500;
        var particleColor;
        var fadeRatio;
        fadeRatio = min(particles[i].life * 5 / maxLife, 1);
        fadeRatio = min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);

        if(options.ColorMode == 'Normal'){     
            if(i%3==0)particleColor = options.Color1;
            if(i%3==1)particleColor = options.Color2;
            if(i%3==2)particleColor = options.Color3;
        }

        if(options.ColorMode == 'Splice'){ 
            if(particles[i].pos.x >=width/3 && particles[i].pos.x <= width/3*2){
                if(i%3==0)particleColor = options.Color1;
                if(i%3==1)particleColor = options.Color2;
                if(i%3==2)particleColor = options.Color3;
            }else if(particles[i].pos.x < width/3 ){
                if(i%3==0)particleColor = "#000000";
                if(i%3==1)particleColor = "#940000";
                if(i%3==2)particleColor = "#808080";
            }else if(particles[i].pos.x > width/3*2 ){
                if(i%3==0)particleColor = "#808080";
                if(i%3==1)particleColor = "#f8660d";
                if(i%3==2)particleColor = "#bade83";
            }
        }
        fill(red(particleColor), green(particleColor), blue(particleColor), alpha * fadeRatio);
        particles[i].display(radius);
    }
}

function Particle(){
    this.vel = createVector(0, 0);
    this.pos = createVector(random(-50, width+50), random(-50, height+50));
    this.life = random(0, maxLife);

    this.move = function(iterations){
        if((this.life -= 0.01666) < 0)
            this.respawn();
        while(iterations > 0){
            var angle = noise(this.pos.x/options.noiseScale, this.pos.y/options.noiseScale)*TWO_PI*options.noiseScale;
            this.vel.x = cos(angle);
            this.vel.y = sin(angle);
            this.vel.mult(0.2);
            this.pos.add(this.vel);
            --iterations;
        }
    }

    this.checkEdge = function(){
        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
            this.respawn();
        }
    }
    
    this.respawn = function(){
        this.pos.x = random(-50, width+50);
        this.pos.y = random(-50, height+50);
        this.life = maxLife;
    }

    this.display = function(r){
        ellipse(this.pos.x, this.pos.y, r, r);
    }
}

document.getElementById("about").addEventListener("click", function() {
    background(backgroundColor);
    options.Color1 = "#000000";
    options.Color2 = "#940000";
    options.Color3 = "#808080";
    options.ColorMode= "Normal";
    $("*[id$=hook]").hide();
    $("*[id$=tagline]").hide();
    $("*[class$=main-links]").hide();

    $("*[id$=pfp").css("visibility", "visible");
    $("*[id$=about-content").css("visibility", "visible");
    $("*[id$=about-big").css("visibility", "visible");
});

document.getElementById("projects").addEventListener("click", function() {
    background(backgroundColor);
    options.Color1 = "#808080";
    options.Color2 = "#0799f2";
    options.Color3 = "#45217c";
    options.ColorMode= "Normal";
    $("*[id$=hook]").hide();
    $("*[id$=tagline]").hide();
    $("*[class$=main-links]").hide();

    $("*[id$=projects-big").css("visibility", "visible");
    $("*[id$=projects-grid").css("visibility", "visible");

});

document.getElementById("contact").addEventListener("click", function() {
    background(backgroundColor);
    options.Color1 = "#808080";
    options.Color2 = "#f8660d";
    options.Color3 = "#bade83";
    options.ColorMode = "Normal";
    $("*[id$=hook]").hide();
    $("*[id$=tagline]").hide();
    $("*[class$=main-links]").hide();

    $("*[id$=contact-big").css("visibility", "visible");
    $("*[id$=contact-tag").css("visibility", "visible");
    $("*[class$=container]").css("visibility", "visible");
});

document.getElementById("title").addEventListener("click", function() {
    background(backgroundColor);
    options.Color1 = "#808080";
    options.Color2 = "#0799f2";
    options.Color3 = "#45217c";
    options.ColorMode= "Splice";
    $("*[id$=hook]").show();
    $("*[id$=tagline]").show();
    $("*[class$=main-links]").show();

    $("*[id$=pfp").css("visibility", "hidden");
    $("*[id$=about-content").css("visibility", "hidden");
    $("*[id$=about-big").css("visibility", "hidden");

    $("*[id$=projects-big").css("visibility", "hidden");
    $("*[id$=projects-grid").css("visibility", "hidden");

    $("*[class$=container]").css("visibility", "hidden");
    $("*[id$=contact-big").css("visibility", "hidden");
    $("*[id$=contact-tag").css("visibility", "hidden");
    $("*[class$=container]").css("visibility", "hidden");

    $("*[id$=thanks").css("visibility", "hidden");
});

document.getElementById("submit").addEventListener("click", function() {
    $("*[class$=container]").css("visibility", "hidden");
    $("*[id$=contact-tag").css("visibility", "hidden");

    $("*[id$=thanks").css("visibility", "visible");
});


