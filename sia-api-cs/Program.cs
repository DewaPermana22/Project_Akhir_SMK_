using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using sia_api_cs.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler =
System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication().AddJwtBearer(f =>
{
    f.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ClockSkew = TimeSpan.Zero,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:TokenSecret"]!))
    };
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowWithCredentials",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        });
});

builder.Services.AddSwaggerGen(sw =>
{
    sw.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Sistem Informasi Akademik RPL",
        Version = "v1",
        Description = "API untuk aplikasi SIARPL_SMKDJ",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Dewa Permana",
            Email = "dewaprmanaptr@gmail.com",
            Url = new Uri("https://www.linkedin.com/in/dewa-permana-807944334")
        },
    });

    sw.AddSecurityDefinition("Fill Token!", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    sw.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Fill Token!"
                }
            },
            Array.Empty<String>()
        },
    });
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowWithCredentials");

app.MapControllers();

app.Run();
