using Microsoft.FeatureManagement;
using FeatureFlagAPI;
using Amazon.SimpleSystemsManagement;

var builder = WebApplication.CreateBuilder(args);

// Add appsettings.json first
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true);

// Configure AWS options from appsettings
var awsOptions = builder.Configuration.GetAWSOptions();

builder.Configuration.AddAppConfig(
    builder.Configuration["AppConfig:ApplicationId"] ?? string.Empty,
    builder.Configuration["AppConfig:EnvironmentId"] ?? string.Empty,
    builder.Configuration["AppConfig:ConfigurationProfileId"] ?? string.Empty,
    awsOptions,
    true,
    TimeSpan.FromSeconds(int.Parse(builder.Configuration["AppConfig:PollIntervalSeconds"] ?? "60")));

// Add AWS services
builder.Services.AddDefaultAWSOptions(awsOptions);
builder.Services.AddAWSService<IAmazonSimpleSystemsManagement>();

// Add Feature Management
builder.Services.AddFeatureManagement();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAny", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAny");
app.UseDeveloperExceptionPage();
app.MapControllers();

app.Run();
